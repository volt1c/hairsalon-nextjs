import { ReactElement } from 'react'

type InfoBoxProps = {
  children: ReactElement | ReactElement[]
}

const InfoBox = ({ children }: InfoBoxProps): ReactElement => (
  <div className="m-8 p-3 bg-base border-t-4 border-primary-400 rounded-md">
    {children}
  </div>
)

export default InfoBox
