import { Linking, NativeModules,Platform} from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import Toast from "../components/Toast"; //第三方相机
import apiEnvironment from '../../../api/ApiEnvironment';
import Toast from './../../../utils/bridge';
import { RSA } from '../../../api/network/RSA';

var lastShowImagePickTime = null;

export default {
    /**
     * callBack
     * @param callBack {ok: 是否上传成功，imageThumbUrl}
     */
     getImagePicker: (callBack) => {
         let now = new Date().getTime();
         if(lastShowImagePickTime !== null && now - lastShowImagePickTime < 1000){
             return;
         }
         lastShowImagePickTime = now;
        const photoOptions = {
            title: '请选择', quality: 1,
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: true,
            noData: false,
            storageOptions: { skipBackup: true, path: 'images' },
            mediaType: 'photo',
        };

        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);
            let uri = Platform.OS === "ios" ? response.uri : response.path;
            uri = uri || '';
            let array = uri.split('.');
            array.reverse();
            let fileType = array[0].toLowerCase();
            let videoType =  ["avi", "wmv", "mpeg", "mp4", "mov", "mkv", "flv", "f4v", "m4v", "rmvb", "rm", "3gp"];
            if (fileType === 'gif'){
                Toast.$toast('不支持上传动态图');
                return;
            } else if (videoType.indexOf(fileType) !== -1){
                Toast.$toast('不支持上传视频');
                return;
            }

            if (response.didCancel) {
                console.log('User cancelled image picker');
                return;
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                return;
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                return;
            } else {
                // Toast.showLoading('图片上传中，请稍后');
                // this.$toastShow('图片上传中，请稍后');
               NativeModules.commModule.RN_ImageCompression(uri, response.fileSize, 1024 * 1024 * 3 , () => {
                   let datas = {
                       type: 'image/png',
                       uri: response.uri,
                       name: new Date().getTime() + 'c.png'
                   };
                   let formData = new FormData();
                   formData.append('file', datas);
                   //commonAPI/ossClient
                   //user/
                   let url = apiEnvironment.getCurrentHostUrl();
                   // if (apiEnvironment.envType.indexOf('dev') === 0) {//非dev,但是有端口号的，全部删除端口号
                   //     url = url + ':8102';
                   // }
                    let singParams = RSA.sign({})
                   fetch(`${url}/common/upload/oss`, {
                       method: 'POST',
                       headers: {
                           'Content-Type': 'multipart/form-data',
                           'Accept': 'application/json',
                           ...singParams
                       },
                       body: formData
                   }).then(resq => resq.json()).then(response => {
                       console.log('+++++')
                       console.log(response)
                       console.log('+++++')
                       Toast.hiddenLoading();
                       if (response.code === 10000 && response.data) {
                           callBack({
                               ok: true,
                               imageUrl: response.data,
                               imageThumbUrl: response.data
                           });
                       } else {
                           callBack({ ok: false, msg: '上传图片失败' });
                       }
                   }).catch(error => {
                       // Toast.hiddenLoading();
                       console.log('+++++')
                       console.log(error)
                       console.log('+++++')
                       Toast.hiddenLoading();
                       callBack({ ok: false, msg: '上传图片失败' });
                       console.log(error);
                       console.warn('图片上传失败' + error.toString());
                   });
               });
            }
        });
    },
    callPhone: (phoneNum) => {
        Linking.openURL('tel:' + phoneNum);
    }
};
