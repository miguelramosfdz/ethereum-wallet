import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import CameraView from 'react-native-camera';
import Modal from 'react-native-modal';
import Permissions from 'react-native-permissions';
import autobind from 'autobind-decorator';
import { Icon } from '@components/widgets';
import { colors } from '@common/styles';

export class Camera extends React.Component {

    state = { isModalVisible: false };

    @autobind
    async show() {
        var status;
        try {
            status = await Permissions.check('camera');
            if (status === 'authorized') this.setState({ isModalVisible: true });
            else {
                status = await Permissions.request('camera');
                if (status === 'authorized') this.setState({ isModalVisible: true });
                else throw new Error('Not allowed to use the camera.');
            }
        } catch (e) {
            console.error(e);
            this.setState({ isModalVisible: false });
        }
    }

    @autobind
    hide() {
        this.setState({ isModalVisible: false });
    }

    @autobind
    onBarCodeRead({ type, data }) {
        if (type === 'QR_CODE') {
            Vibration.vibrate();
            this.hide();
            this.props.onBarCodeRead(data);
        }
    }

    renderView = (onClose) => (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                barCodeTypes={['qr']}
                onBarCodeRead={this.onBarCodeRead} />
            <TouchableWithoutFeedback onPress={onClose}>
                <Icon name='close' color={colors.white} style={styles.closeIcon} />
            </TouchableWithoutFeedback>
            <View style={styles.marker} />
        </View>
    );

    render() {
        const { modal, onClose } = this.props;
        return !modal ? this.renderView(onClose) : (
            <Modal
                onBackButtonPress={onClose}
                isVisible={this.state.isModalVisible}
                children={this.renderView(onClose)} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    camera: {
        flex: 1
    },
    closeIcon: {
        position: 'absolute',
        zIndex: 1,
        top: 8,
        right: 10
    },
    marker: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        width: 200,
        height: 200,
        borderWidth: 4,
        borderColor: 'green'
    }
});