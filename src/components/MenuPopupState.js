import * as React from 'react'
import "./../Post.css"
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'




const MenuPopupState = (props) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  return (
    <div>
      <MoreVertIcon variant="contained" {...bindTrigger(popupState)} />
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={props.deletecomment.bind(this, props.comment)}>DELETE</MenuItem>
      </Menu>
    </div>
  )
}

export default MenuPopupState