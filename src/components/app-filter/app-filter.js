import './app-filter.css'

const appFilter = () => {
  return (
      <div className={'btn-group'}>
          <button className={'btn bnt-light'}
          type={'button'}>
              Все сотрудники
          </button>
          <button className={'btn bnt-light'}
                  type={'button'}>
              На повышение
          </button>
          <button className={'btn bnt-light'}
                  type={'button'}>
              З/П больше 1000$
          </button>
      </div>
  )
}

export default appFilter;