// import { Box } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import DiaryItem from './DiaryItem';
// import { getAllPosts } from '../api-helpers/helpers';
// import { useDispatch, useSelector } from 'react-redux';
// import '../App.css';

// const Diaries = () => {
//   const [rmvDlted, setRmvDlted] = useState(0);
//   const [posts, setPosts] = useState([]);
//   const tabNo = useSelector((state) => {
//     return state.tabReducer.tabNo;
//   })

//   const deleteIt = () => {
//     setRmvDlted(1);
//   }
  
//   const dispatch = useDispatch();

//   dispatch({
//     type: "changeTabNo",
//     payload: 1,
//   });

//   useEffect(() => {
//     getAllPosts()
//       .then((data) => {console.log(data); setPosts(data?.posts);})
//       .catch((err) => console.log(err));
//     setRmvDlted(0);
//   }, [rmvDlted]);


//   return (
//     <>

//       <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" backgroundColor={"#95DEE3"} minWidth="87vw" minHeight={"92vh"}>

//         {!!posts && posts.map((item, ind) => {
//           return (
//             <DiaryItem
//               date={new Date(`${item.date}`).toLocaleDateString()}
//               title={item.title}
//               image={item.image}
//               location={item.location}
//               description={item.description}
//               id={item._id}
//               key={ind}
//               user={item.user}
//               deleteIt={deleteIt}
//               bc={"#379a9430"}
//             />);
//         })}

//       </Box>
//     </>
//   )
// }

// export default Diaries;



// gpt's

import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DiaryItem from './DiaryItem';
import { getAllPosts } from '../api-helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';

const Diaries = () => {
  const [rmvDlted, setRmvDlted] = useState(0);
  const [posts, setPosts] = useState([]);
  const tabNo = useSelector((state) => state.tabReducer.tabNo);
  const dispatch = useDispatch();

  dispatch({
    type: "changeTabNo",
    payload: 1,
  });

  const deleteIt = () => {
    setRmvDlted(1);
  };

  const handleAddComment = (postId, comment) => {
    // Implement the logic to add a comment to the corresponding post
    // You can use an API call or update the state directly
    // Here's an example of updating the state directly:
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  useEffect(() => {
    getAllPosts()
      .then((data) => {
        setPosts(data?.posts);
      })
      .catch((err) => {
        console.log(err);
      });
    setRmvDlted(0);
  }, [rmvDlted]);

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="#95DEE3" minWidth="87vw" minHeight="92vh">
        {!!posts && posts.map((item, ind) => (
          <DiaryItem
            key={ind}
            date={new Date(item.date).toLocaleDateString()}
            title={item.title}
            image={item.image}
            location={item.location}
            description={item.description}
            id={item._id}
            user={item.user}
            deleteIt={deleteIt}
            bc="#379a9430"
            comments={item.comments} // Pass the comments array as a prop
            onAddComment={handleAddComment} // Pass the comment addition function as a prop
          />
        ))}
      </Box>
    </>
  );
};

export default Diaries;
