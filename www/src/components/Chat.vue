<template>
    <div>
        <h4>{{room.name}}</h4>
        <div class="chatboard">
            <h3>active users in room</h3>
            <ul>
                <li v-for="u in room.users">
                    {{u.name}}
                </li>
            </ul>
        </div>
        <form @submit.prevent="sendChat">
            <input type="text" v-model="newChat.body">
        </form>

        <form @submit.prevent="joinRoom">
            <input type="text" v-model="roomName">
        </form>

        <form @submit.prevent="leaveRoom">
            <input type="text" v-model="roomName">
        </form>

        <div class="chatbody">
            <div class="chat-message" v-for="m in messages">
                <p>{{m.body}}</p>
                <p>
                    <small>{{m.creator.name}} -
                        <timeago :since="m.created"></timeago>
                    </small>
                </p>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: 'chat',
        data() {
            return {
                newChat: {},
                roomName: ''
            }
        },
        mounted() {
            this.$store.dispatch('get', { endpoint: 'messages', resource: 'messages' })
        },
        methods: {
            sendChat() {
                this.newChat.created = Date.now()
                this.$store.dispatch('createOne', {
                    resource: 'messages',
                    endpoint: 'messages',
                    data: this.newChat,
                    emit: true
                })
                this.newChat = {}
            },
            joinRoom() {
                this.$store.dispatch('joinRoom', this.roomName)
                this.roomName = ''
            },
            leaveRoom() {
                this.$store.dispatch('leaveRoom', this.roomName)
                this.roomName = ''
            }
        },
        computed: {
            messages() {
                return this.$store.state.messages
            },
            room() {
                return this.$store.state.socketStore.room
            }
        }
    }
</script>