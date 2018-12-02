$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;

    // Make request to Github
    $.ajax({
        url:'https://api.github.com/users/'+username,
        data:{
          client_id:'50afc71dc9d3ce3ba279',
          client_secret:'fa3f99f1582b1e920dd0fe233ad592b83d8f7489'
        }
    }).done(function(user){
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'50afc71dc9d3ce3ba279',
          client_secret:'fa3f99f1582b1e920dd0fe233ad592b83d8f7489'
        }
      }).done(function(repos){
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="card">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>
                </div>
                <div class="col-md-3">
                  <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                </div>
              </div>
            </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="card border-primary mb-3" style="max-width: 100rem;">
          <div class="card-header"><h3>${user.name}</h3></div>
          <div class="card-body">
            <div class="row">
            <div class="col-md-3">
              <img class="img-thumbnail avatar" src="${user.avatar_url}">
              <br>
              <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <span class="badge badge-member">Member: ${user.created_at}</span>
              <br>
              </div>
            </div>
          </div>
        </div>
        <div id="repos"></div>
        `);
    });
  });
});
