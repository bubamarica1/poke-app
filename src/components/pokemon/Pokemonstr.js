import React, { Component } from 'react';
import axios from 'axios';

const TYPE_COLORS= {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dargon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic:'ED4882',
    rock:'B9A156',
    steel:'B5B5C3',
    water:'3295F6'
}

export default class Pokemonstr extends Component {
    state ={
        name: '',
        index: '',
        imageUrl: '',
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense:'',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        abilities:'',
        moves:'',
        to:'',
        evolution:''
    };
    async componentDidMount() {
        const {index} = this.props.match.params;

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}/`;
 
        const pokemonEvolutionUrl = `https://pokeapi.co/api/v2/evolution-chain/${index}/`;

        const pokemonRes = await axios.get(pokemonUrl);
        const x = await axios.get(pokemonEvolutionUrl);
        const name= pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;
        let {hp,attack, defense, speed, specialAttack, specialDefense}= '';


        let evolution = x.data.chain.evolves_to[0].evolves_to[0].species.name;
       
        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp=stat['base_stat'];
                    break;
                    case 'attack':
                        attack=stat['base_stat'];
                        break;
                        case 'defense':
                            defense=stat['base_stat'];
                            break;
                            case 'speed':
                                speed=stat['base_stat'];
                                break;
                                case 'specialAttack':
                                    specialAttack=stat['base_stat'];
                                    break;
                                    case 'specialDefense':
                                        specialDefense=stat['base_stat'];
                                        break;
                                        default: break;

            }
        })
        const types = pokemonRes.data.types.map(type => type.type.name);
        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
            .toLowerCase()
            .split('-')
            .map(s =>s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        });
        
        const moves = pokemonRes.data.moves.map(move => {
            return move.move.name
            .toLowerCase()
            .split('-')
            .map(s =>s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        });
        
        const to=moves[0]
        
        this.setState({
            name,
            imageUrl,
            index,
            types,
            stats : {
                hp, attack, defense, speed, specialAttack, specialDefense
            },
            abilities,
            moves,
            evolution,
            to
        });
        
    }
    
//DRUGI DEO


    render () {
        return <div className='col'>
            <div className='card border-info'>
                <div className='card-header text-info'>
                    <div className='row'>
                        <div className='col-5'>
                           <h5>{this.state.index}</h5> 
                        </div>
                        <div className='col-7'>
                            <div className='float-right'>
                                {this.state.types.map(type => (
                                 <span 
                                 key={type}
                                 className='badge badge-primary badge-pill mr-1'
                                 style={{
                                     backgroundColor: `#${TYPE_COLORS[type]}`,
                                     color: 'white'
                                 }}
                                 >
                                     {type}
                                 </span>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
                    <div className='text-info  card-body'>
                       <div className='row align-items-center'>
                            <div className='col-md-3'>
                                 <img src={this.state.imageUrl}
                                 className='card-img-top rounded mx-auto mt-2' alt=''
                                 />
                            </div>
                            <div className='col-md-9'>
                                <h4><strong>{this.state.name
                                .toLowerCase()
                                .split(' ')
                                .map (s=> s.charAt(0).toUpperCase()+s.substring(1))
                                .join(' ')}</strong></h4>
                                
                                <ul className="d-flex list-group">
  <li className="list-group-item d-inline-flex justify-content-between align-items-center"><strong>HP:</strong>
    <span className="badge badge badge-info badge-pill">{this.state.stats.hp}</span>
  </li>
  <li className="list-group-item d-inline-flex justify-content-between align-items-center"><strong>Attack:</strong>
    
    <span className="badge badge badge-info badge-pill">{this.state.stats.attack}</span>
  </li>
  <li className="list-group-item d-inline-flex justify-content-between align-items-center"><strong>Defense:</strong>
    
    <span className="badge badge badge-info badge-pill">{this.state.stats.defense}</span>
  </li>
  <li className="list-group-item d-inline-flex justify-content-between align-items-center"><strong>Speed:</strong>
    
    <span className="badge badge badge-info badge-pill">{this.state.stats.speed}</span>
  </li>
  <li className="list-group-item d-inline-flex justify-content-between align-items-center"><strong>Move:</strong>
   
    <span className="badge badge badge-info badge-pill">{this.state.to}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center"><strong>Abilities:</strong>
   
    <span className="badge badge badge-info badge-pill">{this.state.abilities}</span>
  </li>
  <li className="list-group-item d-flex justify-content-between align-items-center"><strong>Evolution:</strong>
       
    <span className="badge badge badge-info badge-pill">{this.state.evolution.toLowerCase()
                                .split(' ')
                                .map (s=> s.charAt(0).toUpperCase()+s.substring(1))
                                .join(' ')}</span>
  </li>
</ul>

                                
                            </div>
                       </div>
                    </div>
            </div> 
            
        </div>
    }
}