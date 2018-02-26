import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex pa1 justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/" className="ml1 no-underline black" >
            new
          </Link>
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 no-underline black">
                submit
              </Link>
            </div>
          )}
          {authToken && (
            <div
              className="ml1 pointer black"
              onClick={}
            >

            </div>
          )}

        </div>
      </div>
    )
  }
}


export default withRouter(Header)