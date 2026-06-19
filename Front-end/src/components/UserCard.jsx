import "./UserCard.css";

function UserCard({ user, deleteUser }) {
  return (
    <div className="user-card">
      <div className="card">
        <img
          className="user-card-avatar"
          src={`https://robohash.org/${user._id}`}
          alt="robo"
        />
        <div className="user-card-info">
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Idade: {user.age}</p>
        </div>
      </div>
      <button className="btn-del" onClick={() => deleteUser(user._id)}>
        Delete
      </button>
    </div>
  );
}

export default UserCard;
