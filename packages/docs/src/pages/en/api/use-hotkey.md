---
meta:
  title: useHotkey API
  description: API documentation for the useHotkey composable
  keywords: useHotkey, hotkey, keyboard shortcuts, composable, api
---

<script setup>
  const name = 'useHotkey'
</script>

# useHotkey API

Handle keyboard shortcuts within your application using the **useHotkey** composable.

<PageFeatures />

<ApiBacklinks :name="name" />

<PromotedEntry />

<ApiSearch />

## Function Signature

```typescript
function useHotkey(
  keys: MaybeRef<string | undefined>,
  callback: (e: KeyboardEvent) => void,
  options?: HotkeyOptions
): () => void
```

## Parameters

<section id="parameters" class="mb-4">
  <AppHeadline path="Parameters" />
  <AppSheet>
    <v-table class="api-table" density="comfortable">
      <thead>
        <tr>
          <th class="name">Name</th>
          <th class="type">Type</th>
          <th class="default">Default</th>
          <th class="description">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-mono pt-4">
            <strong>keys</strong>
          </td>
          <td class="text-mono">
            <code>MaybeRef&lt;string | undefined&gt;</code>
          </td>
          <td class="text-mono">
            <em>required</em>
          </td>
          <td class="text-mono pt-4">
            <p>The key combination string or reactive reference to a key combination. Supports modifiers (ctrl, cmd, alt, shift, meta) and key sequences separated by dashes. Changes to reactive refs are automatically applied.</p>
          </td>
        </tr>
        <tr>
          <td class="text-mono pt-4">
            <strong>callback</strong>
          </td>
          <td class="text-mono">
            <code>(e: KeyboardEvent) =&gt; void</code>
          </td>
          <td class="text-mono">
            <em>required</em>
          </td>
          <td class="text-mono pt-4">
            <p>Function to execute when the hotkey is triggered. Receives the KeyboardEvent as a parameter.</p>
          </td>
        </tr>
        <tr>
          <td class="text-mono pt-4">
            <strong>options</strong>
          </td>
          <td class="text-mono">
            <code>HotkeyOptions</code>
          </td>
          <td class="text-mono">
            <code>{}</code>
          </td>
          <td class="text-mono pt-4">
            <p>Optional configuration object to customize hotkey behavior. All options support reactive refs and will update automatically when changed.</p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </AppSheet>
</section>

## Options

<section id="options" class="mb-4">
  <AppHeadline path="HotkeyOptions" />
  <AppSheet>
    <v-table class="api-table" density="comfortable">
      <thead>
        <tr>
          <th class="name">Name</th>
          <th class="type">Type</th>
          <th class="default">Default</th>
          <th class="description">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-mono pt-4">
            <strong>event</strong>
          </td>
          <td class="text-mono">
            <code>MaybeRef&lt;'keydown' | 'keyup'&gt;</code>
          </td>
          <td class="text-mono">
            <code>'keydown'</code>
          </td>
          <td class="text-mono pt-4">
            <p>The keyboard event type to listen for. Can be reactive - changing this will automatically re-register the event listener.</p>
          </td>
        </tr>
        <tr>
          <td class="text-mono pt-4">
            <strong>inputs</strong>
          </td>
          <td class="text-mono">
            <code>MaybeRef&lt;boolean&gt;</code>
          </td>
          <td class="text-mono">
            <code>false</code>
          </td>
          <td class="text-mono pt-4">
            <p>Whether to trigger hotkeys when input elements (input, textarea, contenteditable) are focused. When false, hotkeys are disabled in input contexts. Changes to reactive refs take effect immediately.</p>
          </td>
        </tr>
        <tr>
          <td class="text-mono pt-4">
            <strong>preventDefault</strong>
          </td>
          <td class="text-mono">
            <code>MaybeRef&lt;boolean&gt;</code>
          </td>
          <td class="text-mono">
            <code>true</code>
          </td>
          <td class="text-mono pt-4">
            <p>Whether to call preventDefault() on the keyboard event when the hotkey matches. Can be reactive to dynamically control event prevention.</p>
          </td>
        </tr>
        <tr>
          <td class="text-mono pt-4">
            <strong>sequenceTimeout</strong>
          </td>
          <td class="text-mono">
            <code>MaybeRef&lt;number&gt;</code>
          </td>
          <td class="text-mono">
            <code>1000</code>
          </td>
          <td class="text-mono pt-4">
            <p>Timeout in milliseconds for key sequences. If the next key in a sequence isn't pressed within this time, the sequence resets. Changes to reactive refs apply to new sequences.</p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </AppSheet>
</section>

## Return Value

<section id="return-value" class="mb-4">
  <AppHeadline path="Return Value" />
  <AppSheet>
    <v-table class="api-table" density="comfortable">
      <thead>
        <tr>
          <th class="type">Type</th>
          <th class="description">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-mono">
            <code>() =&gt; void</code>
          </td>
          <td class="text-mono pt-4">
            <p>Cleanup function that removes the keyboard event listener. Automatically called when the component unmounts if used within a Vue component setup context.</p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </AppSheet>
</section>

## Reactive Behavior

<section id="reactive-behavior" class="mb-4">
  <AppHeadline path="Reactive Options" />

  All parameters and options in `useHotkey` support reactive references. When reactive values change, the hotkey behavior updates automatically without needing to re-initialize the composable.

  ### Examples

  **Reactive key combinations:**
  ```typescript
  const currentKeys = ref('ctrl+s')
  const stop = useHotkey(currentKeys, () => console.log('Save'))

  // Changing the keys automatically updates the hotkey
  currentKeys.value = 'cmd+s' // Now listens for cmd+s instead
  ```

  **Reactive options:**
  ```typescript
  const allowInInputs = ref(false)
  const preventDefault = ref(true)

  const stop = useHotkey('enter', handleEnter, {
    inputs: allowInInputs,
    preventDefault: preventDefault
  })

  // Toggle input handling dynamically
  allowInInputs.value = true // Now works in input fields
  preventDefault.value = false // Stops preventing default behavior
  ```

  **Dynamic event type:**
  ```typescript
  const eventType = ref('keydown')
  const stop = useHotkey('space', handleSpace, { event: eventType })

  // Switch to keyup events
  eventType.value = 'keyup' // Automatically re-registers the listener
  ```

  This reactive behavior is particularly useful for:
  - Building interactive configuration interfaces
  - Implementing user-customizable keyboard shortcuts
  - Conditionally enabling/disabling hotkeys based on application state
  - Creating dynamic hotkey behaviors that adapt to different contexts

</section>
