import * as React from 'react'
import "./../Post.css"
import {Button, Input} from '@material-ui/core';
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
      <MoreVertIcon variant="contained" {...bindTrigger(popupState)}  aria-controls="fade-menu" aria-haspopup="true" />
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={popupState.close}>
          <h5 onClick={props.functiontopass.bind(this, props.datatopass)}>{props.labeltopass}</h5>
        </MenuItem>
        {
          props.topmenu && (
            (props.topmenu && props.user) ? (
              <MenuItem onClick={popupState.close}>
                <h5 onClick={props.signout}>{props.signoutlabel}</h5>
              </MenuItem>
            ) : (
              <div>
                <MenuItem onClick={popupState.close}>
                  <h5 onClick={props.signin}>{props.signinlabel}</h5>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <h5 onClick={props.signup}>{props.signuplabel}</h5>
                </MenuItem>
              </div>
            )
          )
        }
        <MenuItem onClick={popupState.close}>
          <h5>{props.lang ? "ANNULER":"CANCEL"}</h5>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MenuPopupState