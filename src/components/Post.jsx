import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, CardBody, CardText, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import userContext from '../context/userContext';
import { getCurrentUserDetails, isLoggedIn } from '../auth/authtoken';

function Post({ post = { id: -1, title: "This is default post title", content: "This is default post content" }, deletePost }) {
  const userContextData = useContext(userContext);
  const [user, setUser] = useState(null);
  const [login, setLogin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUserDetails());
    setLogin(isLoggedIn());
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleDelete = () => {
    deletePost(post);
    toggleModal(); // Close the modal after deletion
  };

  return (
    <Card className='border-0 shadow-sm mt-3'>
      <CardBody>
        <h3>{post.title}</h3>
        <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 70) + "...." }}></CardText>

        <div>
          <Link className='btn btn-secondary border-0' to={'/postpage/' + post.postId}>
            Read More
          </Link>

          {userContextData.user.login && (user && user.id === post.user.id ? (
            <>
              <Button onClick={toggleModal} color='danger' className="ms-2">
                Delete
              </Button>
              <Modal isOpen={modalOpen} toggle={toggleModal} centered>
                <ModalHeader toggle={toggleModal}>Delete Confirmation</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this post?
                </ModalBody>
                <ModalFooter className="d-flex justify-content-center">
                    {/* Use 'd-flex justify-content-center' classes to center the buttons */}
                    <Button color="danger" onClick={handleDelete}>
                      Yes
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                      No
                    </Button>
                  </ModalFooter>
              </Modal>
            </>
          ) : '')}
          {userContextData.user.login && (user && user.id === post.user.id ? (
            <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className="ms-2">
              Update
            </Button>
          ) : '')}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
