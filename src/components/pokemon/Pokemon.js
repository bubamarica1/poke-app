import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
&:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
-moz-user-select:none;
-website-user-select: none;
-o-user-select:none;
`;
const StyledLink = styled(Link)`
text-decoration: none;
color: black;
&:focus,
&:hover,
&:visited,
&link,
&active {
    text-decoration: none;
}
`;
const Sprite = styled.img`
width : 5rem;
height: 5rem;
`;
export default class Pokemon extends Component {
    state = {
        name : '',
        imageUrl: '',
        index:'',
        imageLoading: true,
        toManyRequests: false
    };
    componentDidMount(){
        const name = this.props.name;
        const url=this.props.url;
        const index = url.split(`/`)[url.split(`/`).length - 2];
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${index}.png?raw=true`;
       this.setState({
           name,
           imageUrl,
           index
       });
    
    }
    render () {
        
        return ( 
            <div className='col-md-3 col-sm-6 mb-5 align-items-center'>
                <StyledLink to={`pokemonstr/${this.state.index}`}>
            <Card className='card text-center '>
                <h5 className='card-header'>
              PICK ME
                </h5>
                <Sprite
                className='card-img-top rounded mx-auto mt-2' 
                onLoad={()=> this.setState({imageLoading:false})}
                onError={() => this.setState({toManyRequests : true})}
                src={this.state.imageUrl} 
                />
                <div className='card-body mx-auto'>
                </div>
            
            </Card>
            </StyledLink>
            </div>)
       
    }
}