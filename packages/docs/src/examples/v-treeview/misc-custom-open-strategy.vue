<template>
  <div class="mx-auto">
    <v-treeview
      :items="items"
      open-on-click
      :open-strategy="openStrategy"
    ></v-treeview>
  </div>
</template>

<script>
  export default {
    data: () => ({
      ctrlKeyPressed: false,
      items: [
        {
          value: 'Root',
          title: 'Root',
          $children: [
            {
              value: 'Child #1',
              title: 'Child #1',
              $children: [
                { value: 'Grandchild #1', title: 'Grandchild #1' },
                { value: 'Grandchild #2', title: 'Grandchild #2' },
              ],
            },
            { value: 'Child #2', title: 'Child #2' },
            {
              value: 'Child #3',
              title: 'Child #3',
              $children: [
                { value: 'Grandchild #3', title: 'Grandchild #3' },
                {
                  value: 'Grandchild #4',
                  title: 'Grandchild #4',
                  $children: [
                    { value: 'Grand-grandchild #1', title: 'Grand-grandchild #2' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    mounted () {
      window.addEventListener('keydown', this.checkCtrlKey, { passive: true })
      window.addEventListener('keyup', this.checkCtrlKey, { passive: true })
    },

    beforeUnmount () {
      window.removeEventListener('keydown', this.checkCtrlKey)
      window.removeEventListener('keyup', this.checkCtrlKey)
    },

    methods: {
      checkCtrlKey (e) {
        this.ctrlKeyPressed = e.ctrlKey
      },
      findAllChildren (id, children, found = []) {
        if (!children.has(id)) return found

        for (const child of children.get(id)) {
          found.push(child)

          this.findAllChildren(child, children, found)
        }

        return found
      },
      openStrategy ({ id, value, opened, children, parents }) {
        if (value) {
          opened.add(id)
        } else {
          opened.delete(id)
        }

        if (this.ctrlKeyPressed) {
          const pids = [...new Set([...parents.values()]).values()]

          for (const cid of this.findAllChildren(id, children).filter(cid => pids.includes(cid))) {
            if (value) {
              opened.add(cid)
            } else {
              opened.delete(cid)
            }
          }
        }

        return opened
      },
    },
  }
</script>
