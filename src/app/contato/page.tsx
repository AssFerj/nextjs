export default function Contact() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Contato</h1>
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
          <h3 className="text-center">Contact Us</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input type="text" placeholder="Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="E-mail" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
                <textarea className="textarea textarea-bordered" placeholder="Your Message"></textarea>
              </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Enviar</button>
            </div>
          </form>
        </div>
      </main>
    )
  }