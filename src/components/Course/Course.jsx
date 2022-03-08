import React, {useContext} from 'react';
import bemCssModules from 'bem-css-modules';

import request from '../../helpers/request';
import { StoreContext } from '../../store/StorePrivider';

import { default as CourseStyles } from './Course.module.scss'
import { useNavigate } from 'react-router-dom';

const style = bemCssModules(CourseStyles);

const Course = ({ authors, id, isUserContext = false, img, price, title}) => {
  const { user, setUser } = useContext(StoreContext)
  const navigate = useNavigate();

  const allAuthors = authors.join(', ');
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch(
        '/users',
        {
          login: user.login,
          courseId: id
        }
      );
      
      if (status === 202) {
        setUser(data.user);
        navigate('/my-courses');
      }

    } catch (error) {
      console.warn(error);
    }
  }

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li className={style()}>
      <article>
        <h3 className={style('title')}></h3>
        <img alt={title} className={style('image')} src={img}/>
        <p className={style('price')}>{`Koszt kursu: ${price}zł`}</p>
        <p className={style('authors')}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && <button onClick={handleOnClick}>Kup kurs</button>}
      </article>
    </li>
  )
}

export default Course;