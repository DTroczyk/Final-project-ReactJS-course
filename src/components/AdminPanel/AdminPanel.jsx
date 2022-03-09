import React, { useContext, useState } from 'react'

import { StoreContext } from '../../store/StorePrivider'
import CourseDetails from './subcomponents/CourseDetails';
import CoursePopup from './subcomponents/CoursePopup';

const AdminPanel = () => {
  const { courses } = useContext(StoreContext);
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const showPopup = () => setIsOpenPopup(true);
  const hidePopup = event => {
    if (event) {
      event.preventDefault();
    }
    setIsOpenPopup(false);
  }

  const coursesElements = courses.map(course => <CourseDetails key={course.id} {...course} />);

  return (
    <section>
      {coursesElements}
      <button onClick={showPopup}>Dodaj nowy kurs</button>
      <CoursePopup isEditMode={false} isOpenPopup={isOpenPopup} hidePopup={hidePopup} />
    </section>
  )
}

export default AdminPanel