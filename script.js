const rippleContainer = document.querySelector('.ripple-container');

document.addEventListener('DOMContentLoaded', function() {
  // 为每个菜单项添加点击事件监听器
  document.querySelectorAll('.menu-item a').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      setTimeout(() => {
        window.location.href = this.href;
      }, 300); // 延迟以允许动画完成
    });
  });

  // 为返回按钮添加点击事件监听器
  document.querySelectorAll('.go-back').forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = this.href;
    });
  });

  // 添加鼠标移动事件监听器以创建波纹效果
  document.addEventListener('mousemove', function(e) {
    const rippleContainer = document.querySelector('.ripple-container');
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    const moveX = x * 30; // 调整乘数以控制效果的强度
    const moveY = y * 30; // 调整乘数以控制效果的强度
    rippleContainer.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  // 动态加载艺术作品
  if (document.body.classList.contains('artworks-page')) {
    const galleryColumns = document.querySelectorAll('.artworks-gallery-column');
    const artworks = [
      'media/Untitled_Artwork.PNG',
      'media/homepic.heic',
      'media/homepic.heic',
      'media/homepic.heic',
      'media/homepic.heic'
      // 添加更多图片路径
    ];

    artworks.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'artworks-gallery-item';
      const img = document.createElement('img');
      img.src = src;
      item.appendChild(img);
      galleryColumns[index % 3].appendChild(item); // 将图片分配到三列中

      // 添加点击事件监听器
      item.addEventListener('click', function() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        const content = document.querySelector('.artworks-content');
        modal.style.display = 'block';
        modalImg.src = src;
        content.classList.add('blur-background');
      });
    });
  }

  // 关闭弹窗
  const modal = document.getElementById('image-modal');
  const closeModal = document.querySelector('.image-modal .close');
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    const content = document.querySelector('.artworks-content');
    content.classList.remove('blur-background');
  });

  // 留言板功能
  if (document.body.classList.contains('comment-page')) {
    const commentsContainer = document.getElementById('comments-container');
    const commentInput = document.getElementById('comment-input');
    const sendButton = document.getElementById('send-button');
    const sendSound = document.getElementById('send-sound');

    // 自动调整文本框高度
    commentInput.addEventListener('input', () => {
      commentInput.style.height = 'auto';
      commentInput.style.height = commentInput.scrollHeight + 'px';
    });

    sendButton.addEventListener('click', () => {
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
        const commentBubble = document.createElement('div');
        commentBubble.className = 'comment-bubble';
        commentBubble.textContent = commentText;
        commentsContainer.appendChild(commentBubble);
        commentInput.value = '';
        commentInput.style.height = 'auto'; // 重置文本框高度
        sendSound.play();
        commentsContainer.scrollTop = commentsContainer.scrollHeight;

        // 发送评论到后端服务器
        fetch('http://localhost:3000/send-comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comment: commentText })
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
      }
    });
  }
  
  // 滚动事件监听器
  window.addEventListener('scroll', () => {
    const content = document.querySelector('.content');
    const scrollY = window.scrollY;
    content.style.transform = `translateY(-${scrollY}px)`;
  });
});

// 介绍页面的打字效果
if (document.getElementById("intro-text")) {
  const text = document.getElementById("intro-text").textContent;
  const typingSpeed = 60; // 毫秒
  let index = 0;

  const type = () => {
    if (index < text.length) {
      document.getElementById("intro-text").textContent = text.substring(0, index + 1);
      index++;
      setTimeout(type, typingSpeed);
    }
  };

  type();
}