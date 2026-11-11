<script>
  import { onMount } from 'svelte';
  import { api, img, loadSettings } from '../lib/api.js';

  let authed = null; // null = checking
  let password = '';
  let tab = 'content';
  let msg = '';
  let isError = false;

  let schema = {};
  let values = {};
  let activities = [];
  let faqs = [];

  const blankEvent = () => ({ id: null, title: '', description: '', date: '', status: 'upcoming', is_featured: false, image_url: null });
  let ev = blankEvent();
  let evFile = null;
  let faqForm = { id: null, question: '', answer: '' };

  const notify = (m, err = false) => { msg = m; isError = err; };
  const run = async (fn, ok) => {
    try { await fn(); if (ok) notify(ok); } catch (e) { notify(e.message, true); }
  };

  async function refresh() {
    [schema, values, activities, faqs] = await Promise.all([
      api('/settings/schema'), api('/settings'), api('/activities'), api('/faqs')
    ]);
  }

  onMount(async () => {
    authed = (await api('/auth/me').catch(() => ({}))).authenticated || false;
    if (authed) run(refresh);
  });

  const login = () => run(async () => {
    await api('/auth/login', { method: 'POST', body: { password } });
    password = ''; authed = true; notify('');
    await refresh();
  });
  const logout = () => run(async () => { await api('/auth/logout', { method: 'POST' }); authed = false; });

  const keysOf = (type) => Object.keys(schema).filter((k) => schema[k].type === type);

  const saveContent = () => run(async () => {
    const body = {};
    for (const k of [...keysOf('url'), ...keysOf('text')]) body[k] = values[k] ?? '';
    values = await api('/settings', { method: 'PUT', body });
    loadSettings();
  }, 'Saved');

  const uploadPicture = (key, e) => run(async () => {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData(); form.append('image', file);
    values = await api(`/settings/${key}/image`, { method: 'PUT', form });
    loadSettings(); e.target.value = '';
  }, 'Picture updated');
  const removePicture = (key) => run(async () => {
    values = await api(`/settings/${key}/image`, { method: 'DELETE' }); loadSettings();
  }, 'Picture removed');

  const editEvent = (a) => { ev = { ...a, date: a.date || '', is_featured: !!a.is_featured }; evFile = null; window.scrollTo(0, 0); };
  const saveEvent = () => run(async () => {
    const form = new FormData();
    form.append('title', ev.title); form.append('description', ev.description);
    form.append('date', ev.date); form.append('status', ev.status);
    form.append('is_featured', ev.is_featured ? 'true' : 'false');
    if (evFile) form.append('image', evFile);
    await api(ev.id ? `/activities/${ev.id}` : '/activities', { method: ev.id ? 'PUT' : 'POST', form });
    ev = blankEvent(); evFile = null;
    document.getElementById('ev-file') && (document.getElementById('ev-file').value = '');
    activities = await api('/activities');
  }, 'Event saved');
  const deleteEvent = (a) => confirm(`Delete "${a.title}"?`) && run(async () => {
    await api(`/activities/${a.id}`, { method: 'DELETE' }); activities = await api('/activities');
  }, 'Event deleted');

  const saveFaq = () => run(async () => {
    const body = { question: faqForm.question, answer: faqForm.answer };
    await api(faqForm.id ? `/faqs/${faqForm.id}` : '/faqs', { method: faqForm.id ? 'PUT' : 'POST', body });
    faqForm = { id: null, question: '', answer: '' }; faqs = await api('/faqs');
  }, 'FAQ saved');
  const deleteFaq = (f) => confirm('Delete this FAQ?') && run(async () => {
    await api(`/faqs/${f.id}`, { method: 'DELETE' }); faqs = await api('/faqs');
  }, 'FAQ deleted');
</script>

<div class="admin">
  <header>
    <h1>MIK-HUB Admin</h1>
    <span>
      <a href="/">← Site</a>
      {#if authed}<button class="ghost" on:click={logout}>Log out</button>{/if}
    </span>
  </header>

  {#if msg}<p class="msg" class:err={isError}>{msg}</p>{/if}

  {#if authed === null}
    <p>Loading…</p>
  {:else if !authed}
    <form class="card" on:submit|preventDefault={login}>
      <label>Password <input type="password" bind:value={password} autocomplete="current-password" required /></label>
      <button>Log in</button>
    </form>
  {:else}
    <nav>
      {#each [['content', 'Links & text'], ['pictures', 'Pictures'], ['events', 'Events'], ['faq', 'FAQ']] as [id, label]}
        <button class:active={tab === id} on:click={() => { tab = id; notify(''); }}>{label}</button>
      {/each}
    </nav>

    {#if tab === 'content'}
      <form class="card" on:submit|preventDefault={saveContent}>
        <h2>Google Form links</h2>
        {#each keysOf('url') as k}
          <label>{schema[k].label}
            <input type="url" placeholder="https://forms.gle/…" bind:value={values[k]} />
          </label>
        {/each}
        <h2>Page text</h2>
        {#each keysOf('text') as k}
          <label>{schema[k].label}
            <textarea rows="2" bind:value={values[k]}></textarea>
          </label>
        {/each}
        <button>Save</button>
      </form>

    {:else if tab === 'pictures'}
      {#each keysOf('image') as k}
        <div class="card">
          <h2>{schema[k].label}</h2>
          {#if values[k]}<img class="preview" src={img(values[k])} alt="" />{:else}<p>No picture set.</p>{/if}
          <input type="file" accept="image/*" on:change={(e) => uploadPicture(k, e)} />
          {#if values[k]}<button class="ghost" on:click={() => removePicture(k)}>Remove</button>{/if}
        </div>
      {/each}

    {:else if tab === 'events'}
      <form class="card" on:submit|preventDefault={saveEvent}>
        <h2>{ev.id ? 'Edit event' : 'Add event'}</h2>
        <label>Title <input bind:value={ev.title} required /></label>
        <label>Description <textarea rows="3" bind:value={ev.description} required></textarea></label>
        <div class="row">
          <label>Date <input type="date" bind:value={ev.date} /></label>
          <label>Status
            <select bind:value={ev.status}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
            </select>
          </label>
        </div>
        <label class="check"><input type="checkbox" bind:checked={ev.is_featured} /> Show in front-page carousel</label>
        <label>Picture
          {#if ev.image_url}<img class="preview small" src={img(ev.image_url)} alt="" />{/if}
          <input id="ev-file" type="file" accept="image/*" on:change={(e) => (evFile = e.target.files[0])} />
        </label>
        <div class="row">
          <button>{ev.id ? 'Update' : 'Add'} event</button>
          {#if ev.id}<button type="button" class="ghost" on:click={() => (ev = blankEvent())}>Cancel</button>{/if}
        </div>
      </form>

      {#each activities as a}
        <div class="card item">
          {#if a.image_url}<img class="thumb" src={img(a.image_url)} alt="" />{/if}
          <div>
            <strong>{a.title}</strong> <small>{a.status}{a.date ? ' · ' + a.date : ''}{a.is_featured ? ' · featured' : ''}</small>
            <p>{a.description}</p>
          </div>
          <span>
            <button class="ghost" on:click={() => editEvent(a)}>Edit</button>
            <button class="danger" on:click={() => deleteEvent(a)}>Delete</button>
          </span>
        </div>
      {/each}

    {:else if tab === 'faq'}
      <form class="card" on:submit|preventDefault={saveFaq}>
        <h2>{faqForm.id ? 'Edit FAQ' : 'Add FAQ'}</h2>
        <label>Question <input bind:value={faqForm.question} required /></label>
        <label>Answer <textarea rows="3" bind:value={faqForm.answer} required></textarea></label>
        <div class="row">
          <button>{faqForm.id ? 'Update' : 'Add'}</button>
          {#if faqForm.id}<button type="button" class="ghost" on:click={() => (faqForm = { id: null, question: '', answer: '' })}>Cancel</button>{/if}
        </div>
      </form>
      {#each faqs as f}
        <div class="card item">
          <div><strong>{f.question}</strong><p>{f.answer}</p></div>
          <span>
            <button class="ghost" on:click={() => (faqForm = { id: f.id, question: f.question, answer: f.answer })}>Edit</button>
            <button class="danger" on:click={() => deleteFaq(f)}>Delete</button>
          </span>
        </div>
      {/each}
    {/if}
  {/if}
</div>

<style>
  .admin { max-width: 760px; margin: 0 auto; padding: 2rem 1rem 4rem; font-family: var(--font-family); }
  header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  header span { display: flex; gap: 1rem; align-items: center; }
  h1 { margin: 0; color: var(--color-primary); }
  h2 { margin: 0 0 .5rem; font-size: 1.1rem; }
  nav { display: flex; gap: .5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  nav button { background: #fff; color: var(--color-primary); border: 1px solid var(--color-border); }
  nav button.active { background: var(--color-primary); color: #fff; }
  .card { background: #fff; border: 1px solid var(--color-border); border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem; display: flex; flex-direction: column; gap: .75rem; }
  .item { flex-direction: row; justify-content: space-between; align-items: flex-start; }
  .item p { margin: .25rem 0 0; color: var(--color-text-secondary); }
  .item span { display: flex; gap: .5rem; flex-shrink: 0; }
  label { display: flex; flex-direction: column; gap: .25rem; font-size: .9rem; font-weight: 600; flex: 1; }
  label.check { flex-direction: row; align-items: center; gap: .5rem; font-weight: 500; }
  input:not([type=checkbox]):not([type=file]), textarea, select { padding: .6rem; border: 1px solid #cbd5e1; border-radius: 8px; font: inherit; font-weight: 400; }
  .row { display: flex; gap: .75rem; align-items: flex-end; }
  button { padding: .6rem 1.1rem; border: 0; border-radius: 8px; background: var(--color-accent); color: #fff; font-weight: 600; cursor: pointer; align-self: flex-start; }
  button.ghost { background: #fff; color: var(--color-primary); border: 1px solid #cbd5e1; }
  button.danger { background: #dc2626; }
  .msg { padding: .6rem .9rem; border-radius: 8px; background: #dcfce7; color: #166534; }
  .msg.err { background: #fee2e2; color: #991b1b; }
  .preview { max-width: 100%; max-height: 220px; object-fit: cover; border-radius: 8px; }
  .preview.small { max-height: 90px; align-self: flex-start; }
  .thumb { width: 72px; height: 72px; object-fit: cover; border-radius: 8px; }
</style>
