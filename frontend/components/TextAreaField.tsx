import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea
} from '@chakra-ui/react'
import { useField } from 'formik'
import { InputHTMLAttributes } from 'react'

type TextareaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label: string
}

export default function TextAreaField({
  label,
  size: _,
  ...props
}: TextareaFieldProps) {
  const [field, { error }] = useField(props)
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Textarea {...field} {...props} id={field.name} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
