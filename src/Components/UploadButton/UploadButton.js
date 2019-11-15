import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';
import NewfolderIcon from '@material-ui/icons/CreateNewFolder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import Grow from '@material-ui/core/Grow';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Divider, TextField } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const styles = theme => ({
  root: {
    display: 'flex',
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(3),

  },
  uploadbutton: {
    zIndex: theme.zIndex.drawer + 1,
  },
  paper: {
    marginLeft: theme.spacing(4.5),
    marginTop:theme.spacing(-1),
    background: 'hidden'
  },
  papermodal: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  modalbutton: {
    margin: theme.spacing,
    marginLeft: '230px',

  },
  button: {
    backgroundColor: '#d8d8d8',
    width :'150px',
    height : '40px',
    fontWeight : 'bold',
  },
  textField: {
    marginLeft: theme.spacing,
    marginRight: theme.spacing,
  },
  dense: {
    marginTop: 16,
  },
});

class UploadButton extends React.Component {
  state = {
    open: false,
    open1:false,
    openmodal: false,
    selectedIndex : 0,
    placement: null,
    
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  handleClickAway = () => {
    this.setState({ open: false });  
  };

  handlemodalOpen = () => {
    this.setState({ openmodal: true });
  };

  handlemodalClose = () => {
    this.setState({ openmodal: false });
  };
  handledropopen = () => {
    this.setState({ open1: true });
  }; 
  
  handledropclose = () => {
    this.setState({ open1: false });
  };
  onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
  }

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open,
      placement,
    }));
  };

   

  render() {
    const { classes } = this.props;
    const { open , placement , anchorEl} = this.state;

    return (
      <div className={classes.root}>
        
        <div className={classes.uploadbutton}>
          
          <Button
          className={classes.button}
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick('right-start')}
          >
            Upload
          </Button>
          <Popper  open={open} anchorEl={anchorEl} transition placement={placement} >
            {({ TransitionProps }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
              >
                <ClickAwayListener onClickAway={this.handleClickAway}>
                <Paper className={classes.paper} >
                  <List component="nav" aria-label="main mailbox folders">
                        <ListItem button 
                        selected={this.state.selectedIndex === 1}
                        onClick={event => this.handleListItemClick(event, 1)}>
                        <ListItemIcon >
                            <NewfolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add folder" onClick={this.handlemodalOpen}/>
                        </ListItem>
                            <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.openmodal}
                            onClose={this.handlemodalClose}
                            onClick={this.handleClose}
                            onClickAway={this.handleClickAway}
                            >
                            <div style={getModalStyle()} className={classes.papermodal}>
                                <Typography variant="h6" color="primary" id="modal-title">
                                Add folder
                                </Typography>
                                <TextField
                                id="outlined-dense"
                                fullWidth
                                label="Folder name"
                                className={classNames(classes.textField, classes.dense)}
                                margin="dense"
                                variant="outlined"
                                />
                                <Button href="#text-buttons" color="primary" className={classes.modalbutton} onClick={this.handlemodalClose}>
                                    Cancel
                                </Button>
                                <Button href="#text-buttons" color="primary">
                                    Create
                                </Button>
                                </div>
                            </Modal>
                        <Divider />
                        <ListItem button
                        selected={this.state.selectedIndex === 2}
                        onClick={event => this.handleListItemClick(event, 2)}
                        >
                        <ListItemIcon >
                            <FileIcon />
                        </ListItemIcon>
                            <Dropzone onDrop={this.state.onDrop} 
                                accept="image/*, video/*, audio/*, .png, .jpg, .jpeg.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                                multiple >
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                <ListItemText primary="Upload file" onClick={this.state.handledropopen} onClose={this.state.handledropclose}/>
                                </div>
                            )}
                            </Dropzone>
                        </ListItem>
                        <ListItem button 
                        selected={this.state.selectedIndex === 3}
                        onClick={event => this.handleListItemClick(event, 3)}>
                        <ListItemIcon >
                            <FolderIcon />
                        </ListItemIcon>
                        <Dropzone onDrop={this.state.onDrop} 
                                accept="webkitdirectory/*"                                
                                multiple >
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                <ListItemText primary="Upload folder" onClick={this.state.handledropopen} onClose={this.state.handledropclose}/>
                                </div>
                            )}
                            </Dropzone>                        
                        </ListItem>
                    </List>
                </Paper>
                </ClickAwayListener> 

              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

UploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(UploadButton);

