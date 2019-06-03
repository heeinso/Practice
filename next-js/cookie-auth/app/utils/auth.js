import React from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = async ({ token }) => {
	cookie.set('token', token, { expires: 1 });
	Router.push('/profile');
};

export const logout = () => {
	cookie.remove('token');
	window.localStorage.setItem('logout', Date.now());
	Router.push('/login');
};

export const withAuthSync = (WrappedComponent) => {
  class extends React.Component {
    static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps (ctx) {
      const token = auth(ctx)

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx))

      return { ...componentProps, token }
    }

    componentDidMount () {
      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout = (e) =>  {
      if (e.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/login')
      }
    }

    render () {
      return <WrappedComponent {...this.props} />
    }

  }
}

export const auth = ctx => {
	const { token } = nextCookie(ctx);

	if (ctx.req && !token) {
		ctx.res.writeHead(302, { Location: '/login' });
		ctx.res.end();
		return;
	}

	if (!token) {
		Router.push('/login');
	}

	return token;
};
