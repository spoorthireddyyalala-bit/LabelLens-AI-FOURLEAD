
import { useRef, useState } from "react";
import "./App.css";

const features = [
  {
    number: "01",
    title: "Ingredient Insight",
    description:
      "Understand what's inside your food with a simpler breakdown of ingredients.",
    icon: "✳",
    color: "peach",
  },
  {
    number: "02",
    title: "Nutrition at a Glance",
    description:
      "Explore calories, sugar, protein, fats, and other nutritional information.",
    icon: "◉",
    color: "blue",
  },
  {
    number: "03",
    title: "Allergen Awareness",
    description:
      "Identify declared allergens and ingredients that may need your attention.",
    icon: "✳",
    color: "lavender",
  },
  {
    number: "04",
    title: "Smarter Food Choices",
    description:
      "Compare label information with your preferences and dietary needs.",
    icon: "↗",
    color: "yellow",
  },
];

const preferences = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "Low sugar",
  "Nut allergy",
];

function App() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [preferencesSelected, setPreferencesSelected] = useState([]);
  const [scanStatus, setScanStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setScanStatus("idle");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Your image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (preview) URL.revokeObjectURL(preview);

    setSelectedFile(null);
    setPreview("");
    setScanStatus("idle");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function togglePreference(preference) {
    setPreferencesSelected((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    );
  }

  function handleScan() {
    if (!selectedFile) {
      setError("Upload a food-label image before starting your scan.");
      return;
    }

    setError("");
    setScanStatus("ready");

    // Backend integration will be added after the Express API
    // endpoint and expected upload format are confirmed.
  }

  function scrollToScanner() {
    document.getElementById("scanner")?.scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="LabelLens AI home">
          <span className="brand-mark">L.</span>
          <span>LabelLens <span className="brand-ai">AI</span></span>
        </a>

        <nav className="navigation" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#preferences">Your preferences</a>
        </nav>

        <button className="nav-cta" onClick={scrollToScanner}>
          Scan a label <span>↗</span>
        </button>
      </header>

      <main>
        <section className="hero section-peach" id="home">
          <div className="hero-copy">
            <p className="eyebrow">A FRESH PERSPECTIVE ON FOOD</p>
            <h1>
              Know what
              <br />
              you <em>eat.</em>
            </h1>
            <p className="hero-description">
              Food labels, without the confusion. Discover ingredients,
              understand nutrition, and make informed food choices.
            </p>
            <button className="primary-button" onClick={scrollToScanner}>
              Explore your food <span>↗</span>
            </button>
            <p className="micro-copy">
              YOUR FOOD. YOUR CHOICE. MORE CLARITY.
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                src="/images/hero-food.jpg"
                alt="Fresh ingredients arranged for a healthy meal"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <div className="hero-image-placeholder">
                <span>Fresh choices</span>
                <span className="placeholder-fruit">◒ ✳ ◉</span>
              </div>
            </div>

            <div className="floating-note note-top">
              <span className="note-icon">✳</span>
              <span>
                <strong>Read beyond</strong>
                <small>the front of the pack</small>
              </span>
            </div>

            <div className="floating-note note-bottom">
              <span className="note-icon green-icon">✓</span>
              <span>
                <strong>Make it clearer</strong>
                <small>One label at a time</small>
              </span>
            </div>

            <span className="hero-stamp">GOOD FOOD<br />STARTS HERE</span>
          </div>

          <span className="hero-side-label">THE LABEL EDITION — 001</span>
        </section>

        <section className="intro section-cream" id="about">
          <div className="intro-heading">
            <p className="eyebrow">A LITTLE MORE CLARITY</p>
            <h2>
              Your food label,
              <br />
              <em>decoded.</em>
            </h2>
          </div>

          <div className="intro-content">
            <p>
              Ever picked up a product and wondered what all those ingredients
              actually mean? LabelLens AI helps you explore the information
              already printed on food packaging in a way that's easier to
              understand.
            </p>
            <a href="#features" className="text-link">
              Get to know LabelLens <span>↗</span>
            </a>
          </div>

          <div className="intro-gallery">
            <div className="gallery-image gallery-image-one">
              <img
                src="/images/nutrition-food.jpg"
                alt="Food ingredients and nutrition inspiration"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <span className="gallery-fallback">Eat with curiosity.</span>
            </div>

            <div className="gallery-caption">
              <span>LESS GUESSWORK</span>
              <span>MORE UNDERSTANDING ↗</span>
            </div>
          </div>
        </section>

        <section className="scanner-section section-blue" id="scanner">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PERSONAL LABEL READER</p>
              <h2>
                Scan. Learn.
                <br />
                <em>Choose.</em>
              </h2>
            </div>
            <span className="section-number">01 / THE SCANNER</span>
          </div>

          <div className="scanner-layout">
            <div className="upload-panel">
              <div className="upload-panel-top">
                <span className="tiny-label">LABEL SCANNER</span>
                <span className="status-dot">● READY</span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
                aria-label="Choose a food-label image"
              />

              {preview ? (
                <div className="preview-area">
                  <img
                    src={preview}
                    alt="Preview of the selected food label"
                    className="image-preview"
                  />
                  <button className="remove-button" onClick={removeImage}>
                    Remove image ×
                  </button>
                </div>
              ) : (
                <button
                  className="upload-dropzone"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <span className="upload-icon">＋</span>
                  <strong>Drop a label into your day.</strong>
                  <span>
                    Choose a clear photo of the ingredients or nutrition label.
                  </span>
                  <span className="upload-action">Choose an image ↗</span>
                </button>
              )}

              <div className="upload-footer">
                <span>JPG · PNG · WEBP</span>
                <span>MAXIMUM 10 MB</span>
              </div>

              {error && (
                <p className="feedback-message error-message" role="alert">
                  {error}
                </p>
              )}

              <button
                className="primary-button scan-button"
                onClick={handleScan}
                disabled={!selectedFile}
              >
                Start label scan <span>↗</span>
              </button>

              {scanStatus === "ready" && (
                <div className="feedback-message info-message" role="status">
                  <strong>Your image is ready.</strong>
                  <p>
                    The scanner interface is working. Actual ingredient and
                    nutrition analysis will appear here once the existing
                    Express backend is connected.
                  </p>
                </div>
              )}
            </div>

            <div className="scanner-side">
              <p className="eyebrow">WHAT YOU'LL EXPLORE</p>
              <h3>Small print.<br /><em>Big picture.</em></h3>

              {features.slice(0, 3).map((feature) => (
                <div className="scanner-feature" key={feature.number}>
                  <span>{feature.number}</span>
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                  <span className="feature-arrow">↗</span>
                </div>
              ))}

              <p className="disclaimer">
                LabelLens AI supports informed food choices. Always check the
                original packaging for allergen and dietary information.
              </p>
            </div>
          </div>
        </section>

        <section className="features-section section-lime" id="features">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A CLOSER LOOK AT YOUR FOOD</p>
              <h2>
                The details
                <br />
                <em>matter.</em>
              </h2>
            </div>
            <span className="section-number">02 / THE DETAILS</span>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article
                className={`feature-card card-${feature.color}`}
                key={feature.number}
              >
                <div className="feature-card-top">
                  <span>{feature.number}</span>
                  <span className="feature-card-icon">{feature.icon}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#scanner" aria-label={`Explore ${feature.title}`}>
                  Explore feature <span>↗</span>
                </a>
              </article>
            ))}
          </div>

          <div className="feature-bottom-note">
            <span>INFORMATION THAT MAKES SENSE.</span>
            <span>DESIGNED AROUND YOUR EVERYDAY CHOICES.</span>
          </div>
        </section>

        <section className="preferences-section section-lavender" id="preferences">
          <div className="preferences-copy">
            <p className="eyebrow">MADE FOR YOUR WAY OF EATING</p>
            <h2>
              Your needs.
              <br />
              <em>Your choices.</em>
            </h2>
            <p>
              Select the preferences you'd like to keep in mind while exploring
              food labels. These selections are a starting point, not a
              substitute for checking product ingredients.
            </p>
          </div>

          <div className="preferences-panel">
            <div className="preferences-panel-heading">
              <span>MY FOOD PREFERENCES</span>
              <span>{String(preferencesSelected.length).padStart(2, "0")} SELECTED</span>
            </div>

            <div className="preference-options">
              {preferences.map((preference) => {
                const active = preferencesSelected.includes(preference);

                return (
                  <button
                    key={preference}
                    className={`preference-chip ${active ? "selected" : ""}`}
                    onClick={() => togglePreference(preference)}
                    aria-pressed={active}
                  >
                    <span>{active ? "✓" : "+"}</span>
                    {preference}
                  </button>
                );
              })}
            </div>

            <p className="preference-note">
              {preferencesSelected.length
                ? `Selected: ${preferencesSelected.join(", ")}`
                : "Choose one or more preferences to personalise your experience."}
            </p>

            <button
              className="primary-button preference-scan-button"
              onClick={scrollToScanner}
            >
              Scan your next label <span>↗</span>
            </button>
          </div>
        </section>

        <section className="how-section section-cream">
          <div className="how-intro">
            <p className="eyebrow">THREE SIMPLE STEPS</p>
            <h2>
              A better way
              <br />
              to <em>read food.</em>
            </h2>
          </div>

          <div className="steps-list">
            <div className="step-item">
              <span>01</span>
              <div>
                <h3>Pick your product</h3>
                <p>Choose a clear image of the food label.</p>
              </div>
              <span className="step-symbol">↗</span>
            </div>
            <div className="step-item">
              <span>02</span>
              <div>
                <h3>Explore the details</h3>
                <p>Review ingredient and nutrition information when analysis is connected.</p>
              </div>
              <span className="step-symbol">↗</span>
            </div>
            <div className="step-item">
              <span>03</span>
              <div>
                <h3>Choose with confidence</h3>
                <p>Use label information alongside your own needs and preferences.</p>
              </div>
              <span className="step-symbol">↗</span>
            </div>
          </div>
        </section>

        <section className="closing-banner section-peach">
          <p className="eyebrow">A SMALL CHANGE IN HOW YOU SHOP</p>
          <h2>
            Get to know
            <br />
            what you <em>eat.</em>
          </h2>
          <button className="primary-button" onClick={scrollToScanner}>
            Let's scan a label <span>↗</span>
          </button>
          <span className="closing-decoration">L.</span>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">L.</span>
          <span>LabelLens <span className="brand-ai">AI</span></span>
        </a>

        <p>Understand your food. Make informed choices.</p>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#scanner">Scanner</a>
          <a href="#preferences">Preferences</a>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LabelLens AI</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
