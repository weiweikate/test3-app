import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    InteractionManager
} from 'react-native';
import PropTypes from 'prop-types';

export default class Password extends Component {
    static propTypes = {
        style: View.propTypes.style,
        inputItemStyle: View.propTypes.style,
        iconStyle: View.propTypes.style,
        maxLength: TextInput.propTypes.maxLength.isRequired,
        onChange: PropTypes.func,
        onEnd: PropTypes.func,
        autoFocus: PropTypes.bool
    };

    // 构造
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    static defaultProps = {
        autoFocus: true,
        onChange: () => {
        },
        onEnd: () => {
        }
    };

    componentDidMount() {
        if (this.props.autoFocus) {
            InteractionManager.runAfterInteractions(() => {
                this._onPress();
            });
        }
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress.bind(this)}
                activeOpacity={1}
                underlayColor='transparent'>
                <View style={[styles.container, this.props.style]}>
                    <TextInput
                        style={{ height: 45, zIndex: 99, position: 'absolute', width: 45 * 6, opacity: 0 }}
                        ref='textInput'
                        maxLength={this.props.maxLength}
                        autoFocus={false}
                        keyboardType="number-pad"
                        onChangeText={
                            (text) => {
                                this.setState({ text });
                                this.props.onChange(text);
                                if (text.length === this.props.maxLength) {
                                    this.props.onEnd(text);
                                }
                            }
                        }
                    />
                    {
                        this._getInputItem()
                    }
                </View>
            </TouchableHighlight>
        );

    }

    _getInputItem() {
        let inputItem = [];
        let { text } = this.state;
        for (let i = 0; i < parseInt(this.props.maxLength); i++) {
            if (i == 0) {
                inputItem.push(
                    <View key={i} style={[styles.inputItem, this.props.inputItemStyle]}>
                        {i < text.length ? <View style={[styles.iconStyle, this.props.iconStyle]}/> : null}
                    </View>);
            }
            else {
                inputItem.push(
                    <View key={i}
                          style={[styles.inputItem, styles.inputItemBorderLeftWidth, this.props.inputItemStyle]}>
                        {i < text.length ?
                            <View style={[styles.iconStyle, this.props.iconStyle]}>
                            </View> : null}
                    </View>);
            }
        }
        return inputItem;
    }

    _onPress() {
        this.refs.textInput.focus();
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#fff'
    },
    inputItem: {
        height: 50,
        width: 57,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputItemBorderLeftWidth: {
        borderLeftWidth: 0.5,
        borderColor: '#ddd'
    },
    iconStyle: {
        width: 10,
        height: 10,
        backgroundColor: '#999',
        borderRadius: 5
    }
});