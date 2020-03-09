# EventMix

Static website built using React.

Azure / Github User: cole.peterson@wundermanthompson.com

### Azure Home

https://portal.azure.com/#home

### Azure project overview

https://portal.azure.com/#@wppcloud.net/resource/subscriptions/f08f719e-c8ed-47b5-9bef-e0015805f28c/resourceGroups/event-mix-resources/providers/Microsoft.Web/sites/event-mix-live-stream/appServices

### Azure Portal deployment page

https://portal.azure.com/#@wppcloud.net/resource/subscriptions/f08f719e-c8ed-47b5-9bef-e0015805f28c/resourceGroups/event-mix-resources/providers/Microsoft.Storage/storageAccounts/eventmixlivestream/overview

### Deploy

We are going to track and push the content so fthe build folder.

On push to Master Azure will deploy the content.

`yarn build`

`git add .`

`git commit -m [your message]`

`git push origin master`

MAKE SURE U ARE CHECKING IN THE BUILD FOLDER.

That is what we are deploying to Azure from git hub.

URL

https://event-mix-live-stream.azurewebsites.net/

### azure deploy tips

https://css-tricks.com/deploying-a-client-side-rendered-create-react-app-to-microsoft-azure/
https://medium.com/microsoftazure/deploying-create-react-app-as-a-static-site-on-azure-dd1330b215a5

MAKE SURE YOU HAVE THE .deployment file included at root.

````[config]
project = build```
````

MAKE SURE YOU HAVE THE web.config in /public and /build

````<?xml version="1.0"?>
<configuration>
    <system.webServer>
        <staticContent>
            <mimeMap fileExtension=".json" mimeType="application/json" />
             <mimeMap fileExtension="woff" mimeType="application/font-woff" />
            <mimeMap fileExtension="woff2" mimeType="application/font-woff" />
        </staticContent>
        <rewrite>
            <rules>
                <rule name="React Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>```
````

todo - bar
