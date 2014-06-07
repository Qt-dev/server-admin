/**
* @jsx React.DOM
*/
var ItemList = React.createClass({
  getInitialState: function(){
    return {
      closed: true,
      iconClass: "fa fa-angle-down"
    }
  },
  toggleList: function(){
    if(this.state.closed){
      this.openList();
    } else {
      this.closeList();
    }
  },
  openList: function(){
    this.setState({
      style: {
        height: this.props.items.length + "em"
      },
      closed: false,
      iconClass: "fa fa-angle-up"
    })
  },
  closeList: function(){
    this.setState({
      style: {
        height: "0"
      },
      closed: true,
      iconClass: "fa fa-angle-down"
    })
  },
  buildList: function(){
    var list = this.props.items.map(function(item){
      return (
              <li className="item" key={item.id}>
                <span className="title">{item.title}</span>
                <span className="status">{item.status}</span>
              </li>
              )
    })
                
    return list;
  },
  render: function(){
    if(this.state.closed){
      var closeToggleClass = "closed"
    } else {
      var closeToggleClass = "open"
    }
    var classes = "itemList row " + closeToggleClass;
    return (
      <div className={classes} >
        <h4 onTouchEnd={this.toggleList} onClick={this.toggleList} >{this.props.title}({this.props.items.length}) <i className={this.state.iconClass}></i></h4>
        <ul style={this.state.style}>{this.buildList()}</ul>
      </div>
    )
  }
})