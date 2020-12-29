import React, { Component } from 'react'
import { STRING } from '@constants/Constant'
import AddUpdateModal from 'src/components/modal/AddUpdateModal'

class ChatSupportScreen extends Component {
  renderBody() {
    return (
      <div className="content-wrapper bg-white">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="header">{STRING.chat_support}</h1>
              </div>
            </div>
          </div>
          <AddUpdateModal />
        </div>
      </div>
    )
  }
  render() {
    return <>{this.renderBody()}</>
  }
}

export default ChatSupportScreen
