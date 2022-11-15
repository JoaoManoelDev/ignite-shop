import { styled } from "../../styles"
import * as Dialog from "@radix-ui/react-dialog"


export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  background: '$gray800',
  padding: '3rem',
  paddingTop: '4.5rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
  display: 'flex',
  flexDirection: 'column',

  '> section': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    flex: 1,
    overflowY: 'auto',
    marginBottom: '1.2rem'
  }
})

export const CartClose = styled(Dialog.Close, {
  background: 'none',
  border: 'none',
  color: '$gray500',
  position: 'absolute',
  top: '1.75rem',
  right: '1.75rem'
})

export const CartTitle = styled(Dialog.Title, {
  fontWeight: 700,
  fontSize: '$lg',
  color: '$gray100',
  marginBottom: '2rem',
})

export const CartProduct = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem',
  height: '5.8125rem',
})

export const CartProductImg = styled('div', {
  width: '6.3125rem',
  height: '5.8125rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const CartProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  p: {
    color: '$gray300',
    fontSize: '$md',
  },

  strong: {
    marginTop: 4,
    fontSize: '$md',
    fontWeight: 700,
  },

  button: {
    marginTop: 'auto',
    width: 'max-content',
    background: 'none',
    color: '$green500',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 700,

    '&:hover': {
      transition: '0.2s',
      color: '$green300',
    }
  }
})

export const CartFinalization = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: 'auto',

  button: {
    width: '100%',
    background: '$green500',
    fontSize: '$md',
    height: '4.3125rem',
    border: 'none',
    borderRadius: 8,
    color: '$white',
    fontWeight: 700,

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    },

    '&:not(:disabled):hover': {
      transition: '0.2s',
      background: '$green300',
    }
  }
})

export const FinalizationDetails = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  marginBottom: 55,

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '$md',
      color: '$gray300',
    },

    '&:last-child': {
      fontWeight: 'bold',

      span: {
        fontSize: '$md',
      },

      p: {
        color: '$gray100',
        fontSize: '$xl',
      }
    }
  },
})