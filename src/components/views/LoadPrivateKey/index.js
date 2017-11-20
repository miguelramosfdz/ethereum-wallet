import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import autobind from 'autobind-decorator';
import { Button, InputWithIcon } from 'components/widgets';
import { colors, measures } from 'common/styles';
import { Wallet as WalletUtils } from 'common/utils';
import { Wallets as WalletsActions } from 'common/actions';

export class LoadPrivateKey extends React.Component {
    
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: "Load Wallet"
    });

    state = { pk: '' };

    @autobind
    async onPressOpenWallet() {
        if (!this.state.pk) return;
        
        try {
            const wallet = WalletUtils.loadWalletFromPrivateKey(this.state.pk);
            const { walletName, walletDescription } = this.props.navigation.state.params;
            await WalletsActions.addWallet(walletName, wallet, walletDescription);
            this.props.navigation.navigate('WalletsOverview', { replaceRoute: true });
            await WalletsActions.saveWallets();
        } catch (e) {
            console.warn(e);
        }
    }

    @autobind
    onPressCamera() {
        console.log("Pressed the camera icon");
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <Text style={styles.message}>Private key</Text>
                    <InputWithIcon
                        icon="camera"
                        placeholder="eg.: 3123012f3b1273d12a12b120b12731132b0e2"
                        onChangeText={pk => this.setState({ pk })}
                        onPressIcon={this.onPressCamera} />
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        children="Open wallet"
                        onPress={this.onPressOpenWallet} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    }
});