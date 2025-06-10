const style = await fetch('./my-card.css').then(res => res.text());

class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>${style}</style>
      <div class="card">
        <img id="avatar" />
        <div class="info">
          <h3 id="name"></h3>
          <p id="email"></p>
          <button id="profileBtn">View Profile</button>
        </div>
      </div>
    `;
  }

  // 👇 This tells the browser which attributes to "observe"
  static get observedAttributes() {
    return ['name', 'email', 'avatar', 'profile'];
  }

  // 👇 This runs whenever any of the above attributes change
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.shadowRoot) return;

    if (name === 'name') {
      this.shadowRoot.querySelector("#name").textContent = newValue;
    }

    if (name === 'email') {
      this.shadowRoot.querySelector("#email").textContent = newValue;
    }

    if (name === 'avatar') {
      this.shadowRoot.querySelector("#avatar").src = newValue;
    }

    if (name === 'profile') {
      // Optionally update something — or just handle in button
    }
  }

  connectedCallback() {
    // Initial values
    this.shadowRoot.querySelector("#name").textContent = this.getAttribute("name");
    this.shadowRoot.querySelector("#email").textContent = this.getAttribute("email");
    this.shadowRoot.querySelector("#avatar").src = this.getAttribute("avatar");

    const button = this.shadowRoot.querySelector("#profileBtn");
    button.addEventListener("click", () => {
      const profileUrl = this.getAttribute("profile");
      if (profileUrl) {
        window.open(profileUrl, "_blank");
      } else {
        alert("No profile link provided.");
      }
    });
  }
}

customElements.define('my-card', MyCard);

