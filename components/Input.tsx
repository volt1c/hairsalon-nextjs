import {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactElement,
} from 'react'

type InputProps = {
  labelValue?: string | ReactElement
  type?: string
  name?: string
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const Input = ({
  labelValue = '',
  name = '',
  type = 'text',
  onChange = undefined,
}: InputProps): ReactElement => (
  <label>
    {labelValue}
    <input type={type} name={name} onChange={onChange} />
  </label>
)

export default Input
