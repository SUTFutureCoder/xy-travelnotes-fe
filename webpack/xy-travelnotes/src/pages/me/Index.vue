<template>
    <div id="me">
        <mobile-tear-sheet id="me-info">
            <mu-list>
                <mu-list-item title="星辰">
                    <mu-avatar src="./static/temp/8316449.jpg" slot="leftAvatar"/>
                    <mu-icon value="chat_bubble" slot="right"/>
                </mu-list-item>
            </mu-list>
        </mobile-tear-sheet>

        <mu-divider/>

        <mobile-tear-sheet>
            <mu-list>
                <mu-list-item title="邀约">
                    <mu-icon slot="left" value="inbox"/>
                </mu-list-item>
                <mu-list-item title="隐私">
                    <mu-icon slot="left" value="grade"/>
                </mu-list-item>
                <mu-list-item title="设置">
                    <mu-icon slot="left" value="send"/>
                </mu-list-item>
                <mu-list-item title="关于">
                    <mu-icon slot="left" value="drafts"/>
                </mu-list-item>
            </mu-list>
        </mobile-tear-sheet>

        <mu-raised-button id="copyright" label="©星柚游记 星辰 & 西柚 ALPHA" fullWidth/>
    </div>
</template>
<script>
    export default {

    }
</script>
<style>
    #me-info {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>