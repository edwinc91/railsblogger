var app = angular.module('Blogger', []);

app.controller('postController', ['$http', function ($http) {
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var that = this;

  this.getPosts = function () {
    $http.get('/posts').success(function(data) {
      that.current_user_posts = data.posts;
    })};

    this.getPosts();


  this.createPost = function () {
    that.current_user_posts.push({
      title: this.newPostTitle + "...",
      description: this.newPostDescription + "..."
    });

    $http.post('/posts', {
      authenticity_token: authenticity_token,
      post: {
        title: this.newPostTitle,
        description: this.newPostDescription,
        when: this.newPostDate
      }
    }).success(function(data){
      that.current_user_posts.pop();
      that.current_user_posts.push(data.post);
      that.getPosts();
    }).error(function(err){
      console.log(err);
    })};


  this.deletePost = function(post) {

    $http.delete('/posts/' + post.id, {
      authenticity_token: authenticity_token,
    }).success(function (data) {
      console.log(post);
      that.getPosts();
    }).error(function(data, status) {
      that.getPosts();
      console.log(status);
    });
  }
}]);
// 
//   this.updatePost = function(post) {
//     $http.patch('/posts/' + post.id, {
//       authenticity_token: authenticity_token,
//       post: {
//         title: post.title,
//         description: post.description,
//         when: post.authored_at
//       }
//
//     }).success(function (data) {
//       console.log(data);
//     }).error(function(err) {
//       console.log(err)
//     })
//
//   }
//
// }]);
