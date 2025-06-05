import { useState, useEffect } from 'react';
import TopNav from '../../components/ComplaintPage/TopNav/TopNav';
import FilterSection from '../../components/ComplaintPage/Search/search';
import Post from '../../components/ComplaintPage/Posts/Post';
import FloatingButtons from '../../components/ComplaintPage/Buttons/Buttons';
import NewPostModal from '../../components/ComplaintPage/Modal/Modal';
import Sidebar from '../../components/ComplaintPage/Sidebar/Sidebar';
import postsData from '../../components/ComplaintPage/Data/Posts';
import './Complaint.scss';

function Complaint() {
  const [activeTab, setActiveTab] = useState('timeline');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('recent');
  // const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filterPosts = (filterType) => setCurrentFilter(filterType);
  const sortPosts = (sortType) => setCurrentSort(sortType);
  const switchTab = (tabId) => setActiveTab(tabId);
  // const toggleSearch = () => setShowSearch(!showSearch);
  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    // setShowSearch(false);
  };
  const toggleUserDropdown = () => setShowUserDropdown(!showUserDropdown);
  const closeUserMenu = () => setShowUserDropdown(false);

  const createNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: "me",
      avatar: "VC",
      name: "Você",
      username: "@voce",
      date: new Date().toISOString().split('T')[0],
      timeAgo: "agora",
      content: content,
      image: "",
      comments: 0,
      shares: 0,
      likes: 0,
      commentsList: []
    };
    setPosts([newPost, ...posts]);
    closeModal();
  };

  const addComment = (postId, commentText) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          user: "VC",
          name: "Você",
          time: "agora",
          text: commentText
        };
        return {
          ...post,
          comments: post.comments + 1,
          commentsList: [newComment, ...post.commentsList]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  useEffect(() => {
    let filteredPosts = [...postsData];

    if (activeTab === 'my-posts') {
      filteredPosts = filteredPosts.filter(post => post.user === 'me');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (currentFilter) {
      case 'today':
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.date);
          postDate.setHours(0, 0, 0, 0);
          return postDate.getTime() === today.getTime();
        });
        break;
      case 'week':
        { const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.date);
          postDate.setHours(0, 0, 0, 0);
          return postDate >= oneWeekAgo;
        });
        break; }
      case 'month':
        { const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.date);
          postDate.setHours(0, 0, 0, 0);
          return postDate >= oneMonthAgo;
        });
        break; }
      default:
        break;
    }

    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return currentSort === 'recent' ? dateB - dateA : dateA - dateB;
    });

    setPosts(filteredPosts);
  }, [activeTab, currentFilter, currentSort]);

  return (
    <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="main-content">
        <TopNav
          activeTab={activeTab}
          switchTab={switchTab}
          showUserDropdown={showUserDropdown}
          toggleUserDropdown={toggleUserDropdown}
          closeUserMenu={closeUserMenu}
        />

        <FilterSection
          currentFilter={currentFilter}
          currentSort={currentSort}
          filterPosts={filterPosts}
          sortPosts={sortPosts}
        />

        <div className="tab-content">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              addComment={addComment}
            />
          ))}
        </div>

        <FloatingButtons
          openModal={openModal}
          currentFilter={currentFilter}
          currentSort={currentSort}
          filterPosts={filterPosts}
          sortPosts={sortPosts}
        />

        <NewPostModal
          showModal={showModal}
          closeModal={closeModal}
          createNewPost={createNewPost}
        />
      </div>
    </div>
  );
}

export default Complaint;