import React, { useContext } from 'react';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AuthContext from '../../context/auth/authContext';
import BlogContext from '../../context/blog/blogContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const blogContext = useContext(BlogContext);

  const { logout, user, isAuthenticated } = authContext;
  const { clearBlogs, clearFilter } = blogContext;

  const onLogout = () => {
    clearBlogs();
    clearFilter();
    logout();
  };

  return (
    <header>
      <Navbar
        variant='dark'
        style={{ backgroundColor: '#282828d8' }}
        collapseOnSelect
        expand='lg'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <h1 style={{ fontSize: '4rem' }}>
                <strong>BlogApp</strong>
              </h1>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {isAuthenticated === true ? (
                <>
                  <LinkContainer to='/all-posts'>
                    <Nav.Link className='nav_link'>All Posts</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/my-posts'>
                    <Nav.Link className='nav_link'>My Posts</Nav.Link>
                  </LinkContainer>

                  <NavDropdown
                    title={user && user.name}
                    id='basic-nav-dropdown'
                    className='nav_link'
                  >
                    <LinkContainer to='/login'>
                      <NavDropdown.Item className='nav_link' onClick={onLogout}>
                        Logout
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link className='nav_link'>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link className='nav_link'>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
