import { Icon } from '@chakra-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export const PopoverIcon = (props) => {
  const iconStyles = {
    // eslint-disable-next-line react/prop-types
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.5s',
    transformOrigin: 'center',
  }
  return <Icon aria-hidden as={FiChevronDown} __css={iconStyles} />
}