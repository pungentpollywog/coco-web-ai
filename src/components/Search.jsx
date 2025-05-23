import './Search.css';

export default function Search({ query, updateQuery }) {
  function update(ev) {
    updateQuery(ev.target.value);
  }

  return (
    <div className="search">
      <input type="text" id="search" name="search" value={query} onChange={update} placeholder="Search object(s) e.g. 'dogs'" />
    </div>
  );
}
