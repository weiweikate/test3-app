import { observable, action, computed } from "mobx";
import ShopCartAPI from "../api/ShopCartApi";
import bridge from "../../../utils/bridge";


class ShopCartStore {
    @observable
    data = [];
    @observable
    allMoney = 0;
    @observable
    isAllSelected;

    @action
    clearData() {
        this.data = [];
    }

    @action
    addItemToData(item) {
        if (this.isCanAddItem()) {
            this.data.push(item);
        } else {
            bridge.$toast("购物车数量已达最大数量");
        }
    }

    @computed
    get getTotalSelectGoodsNum() {
        let totalSelectNum = 0;
        this.data.slice().map(item => {
            if (item.isSelected) {
                totalSelectNum += item.amount;
            }
        });
        return totalSelectNum;
    }

    @computed
    get getTotalMoney() {
        let totalMoney = 0;
        this.data.slice().map(item => {
            if (item.isSelected) {
                totalMoney = totalMoney + parseFloat(item.amount) * parseFloat(item.price);
            }
        });

        return totalMoney;
    }

    @computed
    get isCanAddItem() {

        if (this.data.slice().length >= 110) {
            return false;
        } else {
            return true;
        }
    }


    @computed
    get computedSelect() {
        if (this.data.length === 0) {
            return false;
        }
        let flag = true;
        this.data.map(item => {
            if (!item.isSelected) {
                flag = false;
            }
        });
        return flag;
    }

    /**
     以下为购物车数据操作相关方法
     */
    /*是否全部选中方法*/
    isSelectAllItem = (isSelectAll) => {
        if (isSelectAll) {
            this.data.slice().map(item => {
                item.isSelected = true;
            });
        } else {
            this.data.slice().map(item => {
                item.isSelected = false;
            });
        }
    };
    /*更新购物车商品*/
    updateCartItem = (itemData, rowId) => {
        if (this.data.splice().length > rowId) {
            ShopCartAPI.updateItem(
                itemData
            ).then(res => {
                this.data[rowId] = itemData;
            }).catch(error => {
                bridge.$toast(error.msg);
            });
        }
    };
    /*请求购物车商品*/
    getShopCartListData = () => {
        let tempArr = [];
        ShopCartAPI.list().then(result => {
            result.data.forEach(item => {
                item.isSelected = false;
                let [...valueArr] = item.specValues;
                console.warn(valueArr);
                let tempString = "";
                valueArr.map((string) => {
                    tempString = tempString + `${string} `;
                });
                item.specString = tempString;
                console.log(item.specString);
                tempArr.push(item);
            });
            this.data = tempArr;
        }).then(error => {
            bridge.$toast(error.msg);
        });
    };

    /*加入购物车*/
    addItemToShopCart(item) {
        if (item) {
            ShopCartAPI.addItem({
                "amount": 10,
                "priceId": 1,
                "productId": 1,
                "timestamp": 1536633469102
            }).then((res) => {
                this.getShopCartListData();
            }).catch((error) => {
                bridge.$toast(error.msg);
            });
        } else {
            bridge.$toast("添加商品不能为空");
        }
    }

    /*删除购物车商品*/
    deleteItemWithIndex(priceId) {
        if (priceId) {
            ShopCartAPI.deleteItem({
                "priceId": priceId
            }).then(res => {
                bridge.$toast("删除成功");
                this.getShopCartListData();
            }).catch(error => {
                bridge.$toast(error.msg);
            });
        }
    }
}

const shopCartStore = new ShopCartStore();

export default shopCartStore;

