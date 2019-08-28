import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
// import { FolderListItems, OtherFolderListItems } from './MenuItems';

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  toolbar: theme.mixins.toolbar
});

class NavbarLeftMenu extends React.Component {
  state = {
    left: false
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
  };

  render() {
    const { classes} = this.props;
    const { left } = this.state;

    const sideList = (
      <div className={classes.list}>
        <div className={classes.toolbar} />
        <Link className={classes.link} to="/dashboard">
            <MenuItem onClick={()=>{
               document.getElementById('dashboard').style.display = "block"
               document.getElementById('ajout').style.display = "none"
               document.getElementById('pub-entreprise').style.display = "none"
            } 
             }>liste des produits</MenuItem>
          </Link>
          <Link className={classes.link} to="/dashboard">
            <MenuItem onClick={()=>{
               document.getElementById('dashboard').style.display = "none"
               document.getElementById('ajout').style.display = "none";
               document.getElementById('pub-entreprise').style.display = "block";
            } 
             }>liste des produits {localStorage.getItem('nomEntre')}</MenuItem>
          </Link>
        <Divider />
        <List>
          {/* <FolderListItems user={user} /> */}
        </List>
        <Divider />
        {/* <List>{OtherFolderListItems}</List> */}
      </div>
    );

    return (
      <div>
        <MenuIcon onClick={this.toggleDrawer(true)} />
        <Drawer open={left} onClose={this.toggleDrawer(false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer(false)}
            onKeyDown={this.toggleDrawer(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(NavbarLeftMenu);