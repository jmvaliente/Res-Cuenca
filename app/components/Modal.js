import React from 'react'
import { Overlay } from 'react-native-elements'
import { styles } from '../../assets/css/styles'

export default function Modal(props) {

    const { isVisible, setIsVisible, children } = props

    const closeModal = () => setIsVisible(false)
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlayModal}
            onBackdropPress={() => closeModal()}
        >
            {children}
        </Overlay>
    )
}