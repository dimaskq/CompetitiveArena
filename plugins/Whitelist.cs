using System;
using Newtonsoft.Json;
using System.Collections.Generic;
using Oxide.Core.Libraries.Covalence;

namespace Oxide.Plugins
{
    [Info("Whitelist", "tra1nel", "1.8.2")]
    [Description("Checks whitelist and solo status from external API.")]
    public class Whitelist : CovalencePlugin
    {
        private const string API_URL = "https://rust-pkqo.onrender.com/api/users";

        private void CanClientLogin(Network.Connection connection)
        {
            string name = connection.username;
            string id = connection.userid.ToString();
            string ip = connection.ipaddress;

            Puts($"[Whitelist] Проверяем игрока {name} (SteamID: {id})...");

            webrequest.Enqueue(API_URL, null, (code, response) =>
            {
                if (code != 200 || string.IsNullOrEmpty(response))
                {
                    Puts($"[Whitelist] Ошибка API: Код {code}, ответ: {response}");
                    RejectPlayer(connection, "Ошибка сервера whitelist!");
                    return;
                }

                Puts($"[Whitelist] Получен ответ API: {response}");

                try
                {
                    var users = JsonConvert.DeserializeObject<List<User>>(response);
                    if (users == null)
                    {
                        Puts("[Whitelist] Ошибка: API вернул null после десериализации.");
                        RejectPlayer(connection, "Ошибка сервера whitelist!");
                        return;
                    }

                    Puts($"[Whitelist] Найдено пользователей: {users.Count}");
                    var user = users.Find(u => u.steamId == id); 
                    if (user != null)
                    {
                        Puts($"[Whitelist] Найден игрок: {user.steamId}, solo: {user.servers[0].solo}");

                        if (user.servers[0].solo == 1)
                        {
                            Puts($"[Whitelist] ✅ {name} (SteamID: {id}) допущен на сервер.");
                            return; 
                        }
                        else
                        {
                            RejectPlayer(connection, "Вы не в whitelist или не в соло!");
                        }
                    }
                    else
                    {
                        Puts($"[Whitelist] Игрок с SteamID {id} не найден в данных.");
                        RejectPlayer(connection, "Вы не в whitelist!");
                    }
                }
                catch (Exception ex)
                {
                    Puts($"[Whitelist] Ошибка парсинга JSON: {ex.Message}");
                    RejectPlayer(connection, "Ошибка сервера whitelist!");
                }
            }, this);
        }

        private void RejectPlayer(Network.Connection connection, string reason)
        {
            Puts($"[Whitelist] ❌ Отклонён {connection.username}: {reason}");
            Network.Net.sv.Kick(connection, reason);
        }

        private class User
        {
            [JsonProperty("steamId")]
            public string steamId { get; set; } 
            public List<ServerData> servers { get; set; }
        }

        private class ServerData
        {
            public int solo { get; set; }
        }
    }
}