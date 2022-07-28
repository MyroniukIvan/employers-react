import {Component} from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{name: 'John C.', salary: 800, increase: false, rise: true, id: 1}, {
                name: 'Alex M.', salary: 3000, increase: true, rise: false, id: 2
            }, {name: 'Carl W.', salary: 5000, increase: false, rise: false, id: 3}], term: '', filter: '',
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary, items) => {
        //adding new item to store data features
        const newItem = {
            name, salary, increase: false, rise: false, id: this.maxId++,
        }

        // Check for not adding empty names and salaries
        if (name.length < 3 && name.length != null) {
            return;
        }
        if (salary.length < 3 && salary.length !== null) {
            return;
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }


    onToggleProp = (id, prop) => {
        //возвращаем новый массив через мар, если совпадают ид то возваращаем новый обьект, если не совпадает то возвращаем старый обьект
        // есть -, сетСтате - ассинхронная, выполняется не сразу, при клике на печеньку есть задержка
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        // take name of every item use indexOf for every of them and return those who are completed by condition > -1
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        //setting new short way to check employers quantity
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
        return (<div className="app">
            <AppInfo
                employers={employers}
                increased={increased}
            />
            <div className="search-panel">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter
                    fiter={filter}
                    onFilterSelect={this.onFilterSelect}/>
            </div>

            <EmployersList
                data={visibleData}
                onDelete={this.deleteItem}
                onToggleProp={this.onToggleProp}
            />
            <EmployersAddForm onAdd={this.addItem}/>
        </div>);
    }
}

export default App;