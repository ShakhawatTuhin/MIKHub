<section class="apply-cta">
  <div class="apply-cta__bg-circle apply-cta__bg-circle--left"></div>
  <div class="apply-cta__bg-circle apply-cta__bg-circle--right"></div>
  <div class="container apply-cta__inner">
    <h2 class="apply-cta__heading">Ready to build with us?</h2>
    <p class="apply-cta__sub">
      Applications are open. Tell us what excites you and join the next cohort of MIK-HUB builders.
    </p>
    <a
      href="https://forms.google.com/YOUR_FORM_ID"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-white"
    >
      APPLY NOW →
    </a>
  </div>
</section>

<style>
  .apply-cta {
    position:      relative;
    overflow:      hidden;
    background:    var(--color-cta);
    padding:       var(--space-16) var(--space-8);
    margin:        0 var(--space-8);
    border-radius: var(--radius-xl);
  }

  .apply-cta__inner {
    position:   relative;
    z-index:    1;
    text-align: center;
    max-width:  600px;
  }

  .apply-cta__heading {
    font-size:   var(--text-4xl);
    font-weight: var(--font-extrabold);
    color:       var(--color-white);
    line-height: var(--leading-tight);
  }

  .apply-cta__sub {
    font-size:   var(--text-base);
    color:       rgba(255,255,255,0.85);
    margin-top:  var(--space-3);
    line-height: var(--leading-normal);
  }

  .apply-cta :global(.btn-white) {
    margin-top:     var(--space-8);
    font-weight:    var(--font-bold);
    font-size:      var(--text-sm);
    letter-spacing: 0.04em;
  }

  .apply-cta__bg-circle {
    position:       absolute;
    border-radius:  50%;
    border:         2px solid rgba(255,255,255,0.15);
    pointer-events: none;
  }

  .apply-cta__bg-circle--left {
    width:  300px;
    height: 300px;
    bottom: -80px;
    left:   -60px;
  }

  .apply-cta__bg-circle--right {
    width:  220px;
    height: 220px;
    top:    -60px;
    right:  40px;
  }

  @media (max-width: 768px) {
    .apply-cta          { margin: 0 var(--space-4); padding: var(--space-12) var(--space-6); }
    .apply-cta__heading { font-size: var(--text-3xl); }
  }

  @media (max-width: 576px) {
    .apply-cta          { margin: 0; border-radius: 0; }
    .apply-cta__heading { font-size: var(--text-2xl); }
  }
</style>