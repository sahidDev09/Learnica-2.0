"use client"
import { useQuery } from "@tanstack/react-query";

function Notes() {
  const {data:notes, isLoading} = useQuery({
    queryKey: ['my-notes'],
    queryFn: async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/my-notes')
      return res.json()
    }
  })

  if (isLoading){ return <span className="loading loading-spinner loading-lg"></span> }
  return (
    <section className="max-w-screen-lg mx-auto my-6">
      <header className="mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">My Notes</h2>
      </header>

      {/* cards */}
      {notes.length > 0
        ? (
          <div className="space-y-5 max-h-[600px] border p-3 rounded-md overflow-y-auto">
            {notes.map(note => (
              <div key={note._id} className="border p-4 rounded-md shadow-md bg-card mb-3">
                <h3 className="text-primary font-semibold text-lg mb-1">{note.title}</h3>
                <p className="text-sm text-gray-500">{note.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500">You haven't added any notes!</p>
        )
      }
    </section>
  );
}

export default Notes;