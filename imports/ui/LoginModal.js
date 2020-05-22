import React from 'react'
import Modal from 'react-modal'
import LoginForm from './LoginForm'

export default class LoginModal extends React.Component {
  state = {
    modal: false
  }
  componentDidMount() {
    Modal.setAppElement('#app')
  }
  handleModalOpen = () => {
    this.setState({ modal: true })
  }
  handleModalClose = () => {
    this.setState({ modal: false })
  }
  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        contentLabel="Add link"
        onRequestClose={this.handleModalClose}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal"
      >
        <LoginForm />
      </Modal>
    )
  }
}
