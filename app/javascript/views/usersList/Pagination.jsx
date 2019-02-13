import React from 'react'
import classnames from 'classnames'
import PaginationRT from 'react-table/lib/pagination'
import { Button as ButtonRWD } from 'react-wood-duck'

const previousButton = props => (
  <ButtonRWD btnClassName="default" btnName={<span className="glyphicon glyphicon-chevron-left" />} {...props} />
)

const nextButton = props => (
  <ButtonRWD btnClassName="default" btnName={<span className="glyphicon glyphicon-chevron-right" />} {...props} />
)

class Pagination extends PaginationRT {
  renderInput() {
    return (
      <input
        type={this.state.page === '' ? 'text' : 'number'}
        onChange={e => {
          const val = e.target.value
          const page = val - 1
          val === '' ? this.setState({ page: val }) : this.setState({ page: this.getSafePage(page) })
        }}
        value={this.state.page === '' ? '' : this.state.page + 1}
        onBlur={this.applyPage}
        onKeyPress={e => {
          if (e.which === 13 || e.keyCode === 13) {
            this.applyPage()
          }
        }}
      />
    )
  }

  renderPreviousComponent() {
    const { canPrevious, PreviousComponent = previousButton, page } = this.props
    return (
      <div className="-previous">
        <PreviousComponent
          onClick={() => {
            if (!canPrevious) return
            this.changePage(page - 1)
          }}
          disabled={!canPrevious}
        >
          {this.props.previousText}
        </PreviousComponent>
      </div>
    )
  }

  renderNextComponent() {
    const { canNext, NextComponent = nextButton, page } = this.props
    return (
      <div className="-next">
        <NextComponent
          onClick={() => {
            if (!canNext) return
            this.changePage(page + 1)
          }}
          disabled={!canNext}
        >
          {this.props.nextText}
        </NextComponent>
      </div>
    )
  }

  render() {
    const { pages, page, showPageSizeOptions, pageSizeOptions, pageSize, showPageJump, onPageSizeChange, className } = this.props
    return (
      <div className={classnames(className, '-pagination')} style={this.props.style}>
        {showPageSizeOptions && (
          <span className="select-wrap -pageSizeOptions">
            <select onBlur={_ => {}} onChange={e => onPageSizeChange(Number(e.target.value))} value={pageSize}>
              {pageSizeOptions.map((option, i) => (
                <option key={i} value={option}>
                  {`${option} ${this.props.rowsText}`}
                </option>
              ))}
            </select>
          </span>
        )}
        {this.renderPreviousComponent()}
        <div className="-center">
          <span className="-pageInfo">
            {showPageJump ? (
              <div className="-pageJump">{this.renderInput()}</div>
            ) : (
              <span className="-currentPage">{page + 1}</span>
            )}{' '}
            {this.props.ofText} <span className="-totalPages">{pages || 1}</span>
          </span>
        </div>
        {this.renderNextComponent()}
      </div>
    )
  }
}

export default Pagination
