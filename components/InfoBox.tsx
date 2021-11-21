import { ReactElement } from 'react'
import styles from '@styles/components/InfoBox.module.css'

type InfoBoxProps = {
  children: ReactElement | ReactElement[]
}

const InfoBox = ({ children }: InfoBoxProps): ReactElement => (
  <div className={styles.self}>
    <div className={styles.box}>{children}</div>
  </div>
)

export default InfoBox
