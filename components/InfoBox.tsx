import { ReactElement } from 'react'

type InfoBoxProps = {
  children: ReactElement | ReactElement[]
  className?: string | undefined
}

const InfoBox = ({ children, className = '' }: InfoBoxProps): ReactElement => (
  <div
    className={`${className}  bg-base border-t-4 border-primary-400 rounded-md`}
  >
    {children}
  </div>
)

export default InfoBox
