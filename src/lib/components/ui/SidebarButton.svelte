<script>
  export let href = '';
  export let tooltip = '';
  export let isSelected = false;
  export let icon;
  export let label;
</script>

<!-- <a {href}>
  <div class="nav-button relative">
    <button
      class={`flex justify-center w-full color-sidebar-icon-color hover:transition-colors ${
        isSelected ? 'text-btn-active' : 'text-sidebar-element'
      }`}
    >
      {@html icon}
    </button>
    <span class="tooltip">{tooltip}</span>
  </div>
</a> -->

<li>
  <a {href}>
    {@html icon}
    <i class="icon"></i>
    <span class="nav-item">{label}</span>
  </a>
  <span class="nav-item">{label}</span>
  <span class="tooltip">{tooltip}</span>
</li>

<style>
  .tooltip {
    visibility: hidden;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
    white-space: nowrap; /* Prevent the tooltip text from wrapping */
    display: inline-block; /* Make the tooltip behave like an inline-block element */

    /* Positioning */
    position: absolute;
    z-index: 1;
    top: 50%; /* Align the tooltip vertically in the center */
    left: 105%; /* Place tooltip to the right of the icon */
    transform: translateY(-50%); /* Center the tooltip vertically */

    opacity: 0;
    transition: opacity 0.2s;
  }

  .nav-button:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>
