import React, { /*useContext, */ useEffect } from 'react'

//import { MyWebviewContentsContext } from '../../constants'
import { Footer } from '../shared-components/footer'
import { Header } from '../shared-components/header'
import { WebviewModal } from '../shared-components/webview-modal'
import { SentModal } from './components/sent-modal'
import { steps } from './components/steps'
import { useFooter } from './hooks/use-footer'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { Modal, setWhatsAppDesktop } from './redux/view-slice'
import { WebviewContainer } from './styles'

interface ExampleAppProps {
  isWhatsAppDesktop: boolean
}

export const ExampleApp = ({ isWhatsAppDesktop }: ExampleAppProps) => {
  //const { contents } = useContext(MyWebviewContentsContext)

  const viewState = useAppSelector(state => state.view)
  const currentStep = steps[viewState.numStep]
  const footerProps = useFooter()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setWhatsAppDesktop({ isWhatsAppDesktop }))
  }, [])

  const currentModal: Record<Modal, JSX.Element> = {
    [Modal.sent]: <SentModal />,
  }

  return (
    <WebviewContainer>
      <Header title={'WEBVIEW HEADER TITLE'} />
      {currentStep.compontent}
      <Footer {...footerProps} />

      {viewState.modal && (
        <WebviewModal
          isWhatsAppDesktop={viewState.isWhatsAppDesktop as boolean}
        >
          <>{currentModal[viewState.modal]}</>
        </WebviewModal>
      )}
    </WebviewContainer>
  )
}
