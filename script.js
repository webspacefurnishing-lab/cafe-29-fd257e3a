const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('is-open', !expanded);
  toggle.querySelector('span').textContent = expanded ? '+' : '−';
});
function closeNavigation() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
  toggle.querySelector('span').textContent = '+';
}
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
    closeNavigation();
    toggle.focus();
  }
});
const dialog = document.querySelector('#contact-dialog');
let previousFocus;
document.querySelectorAll('[data-contact]').forEach(button => {
  button.addEventListener('click', () => {
    previousFocus = button;
    closeNavigation();
    document.querySelector('#contact-status').textContent = '';
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
dialog.addEventListener('close', () => {
  if (previousFocus) previousFocus.focus();
});
async function copyText(value, status) {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(value);
    status.textContent = 'Copied to clipboard.';
  } catch (error) {
    status.textContent = 'Select and copy: ' + value;
  }
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', () => copyText(button.dataset.copy, document.querySelector('#contact-status')));
});
document.querySelector('[data-copy-address]').addEventListener('click', () => {
  copyText('Cafe 29, 29 Anders Square, Perton, Wolverhampton, WV6 7QH', document.querySelector('#address-status'));
});