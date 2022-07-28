import './app-filter.css'


const AppFilter = (props) => {
        const buttonsData = [
            {name: 'all', label: 'Все сотрудники'},
            {name: 'rise', label: 'На повышение'},
            {name: 'moreThan1000', label: ' З/П больше 1000$'},
        ];

     const buttons = buttonsData.map(({name,label}) => {

        // if props filter = name / returns true/false
         const active = props.filter === name;
        // highlighting active / unactive btns
         const clazz = active ? "btn-light" : "btn-outline-light";

         return (
            <button
                className={`btn ${clazz}`}
                type={'button'}
                key={name}
            onClick={() => props.onFilterSelect(name)}>
                {label}
            </button>
             )
        })

        return (
            <div className={'btn-group'}>
                {buttons}
            </div>
        )
}
export default AppFilter;