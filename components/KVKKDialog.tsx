import * as React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

const KVKKMetni = `

BAYRAKTAR TEKNOLOJİ (‘‘Şirket’’) tarafından, 6698 Sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVK Kanunu”) ilgili hükümlerine uygun olarak bilginize sunulan Kişisel Verilerin Korunması Kanunu Kapsamında Genel Aydınlatma Metni ve Şirket Kişisel Verilerin Korunması ve İşlenmesi Yönetmeliği çerçevesinde,

Kişisel verilerinin veri sorumlusu sıfatıyla Şirket veya gerekli güvenlik tedbirlerini aldırmak suretiyle yetkilendirdiği veri işleyenler tarafından; Şirket’in müşterilerine sunmuş olduğu ürün ve hizmetlerini en iyi koşullar altında sağlayabilmesi, ürün veya hizmetlerin güvenilir ve kesintisiz bir şekilde temin edilmesi, müşteri memnuniyetinin en üst seviyeye çıkarılması, ödemelerin yapılması, mezkûr hizmetlere ilişkin çeşitli işlemlerin yerine getirilmesi, operasyonların yürütülmesi ve geliştirilmesi, mezkûr ürün ve hizmetlerin veya farklı ürün ve hizmetlerin tanıtım, pazarlama, reklam ve kampanya faaliyetlerinin yapılması, müşterilerin fırsatlardan, kampanyalardan ve sair hizmetlerden haberdar edilmesi ve müşterilerle akdedilen sözleşmelerin gereklerinin yerine getirilmesi amaçlarıyla doğrudan veya dolaylı olarak ilgili olan kimlik bilgilerinin, adres bilgilerinin, iletişim bilgilerinin ve sair kişisel verilerin; başta mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilme ilkesi olmak üzere 6698 Sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVK Kanunu”) 4. maddesinde ifade edilen genel ilkelere uygun şekilde işlenebileceğini; elde edilebileceğini, kaydedilebileceğini, işlenme amacıyla uygun süre zarfında fiziksel veya elektronik ortamda güvenli bir şekilde depolanabileceğini, muhafaza edilebileceğini, değiştirilebileceğini, yeniden düzenlenebileceğini, mevzuata uygun biçimde açıklanabileceğini ve aktarılabileceğini, devralınabileceğini, sınıflandırılabileceğini, işlenebileceğini ya da verilerin kullanılmasının engellenebileceğini; yukarıda belirtilen hususlarla ilgili olarak Şirket tarafından bilgilendirildiğimi ve KVK Kanunu çerçevesinde açık rızam bulunduğunu kabul ve beyan ederim.

İşbu kişisel verilerimin, yukarıda belirtilen amaçlarla bağlı kalmak kaydıyla, Şirket tarafından; Şirket çalışanlarına, görevlilerine, grup şirketlerine (Şirket ve/veya iş ortaklarına, hissedarlarına), kanunen yetkili kamu kurum ve kuruluşlarına, faaliyetlerini yürütebilmek amacıyla, hukuki zorunluluklar ve yasal sınırlamalar çerçevesinde bağımsız denetim şirketlerine, anket şirketlerine, tarafıma verilecek hizmetlerin ve/veya faaliyetlerin yürütülmesi için Şirket’in hizmet aldığı veya birlikte çalıştığı iş ortaklarına ve hizmet sağlayıcılarına aktarılabileceğini ve bu hususta açık rızam olduğunu kabul ve beyan ederim.

Bununla birlikte, KVK Kanunu’nun 11.maddesi ve ilgili mevzuat uyarınca; Şirkete başvurarak kendimle ilgili; kişisel veri işlenip işlenmediğini öğrenme, kişisel verilerim işlenmişse buna ilişkin bilgi talep etme, kişisel verilerimin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme, kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme, işbu verilerin işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerimin silinmesini veya yok edilmesini isteme, bu düzeltme ve silinme taleplerinin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme, işlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kendi aleyhime bir sonucun ortaya çıkmasına itiraz etme, kişisel verilerimin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme haklarımın olduğunu ve bu hakları kullanmak için kimliğimi tespit edici gerekli bilgiler ile kullanmayı talep ettiğim hakkıma yönelik açıklamaları da içeren talebimi http://www.baykar.com.tr adresindeki formu doldurarak ve formun imzalı bir nüshasını İstanbul adresinde bulunan Şirket Müdürlüğü’ne kimliğimi tespit edici belgeler ile bizzat elden iletme yahut noter kanalıyla veya KVK Kanunu’nda belirtilen diğer yöntemler ile iletme hakkına sahip olduğumu kabul ediyorum.

Ayrıca, Şirket ile paylaşmış olduğum kişisel verilerin doğru ve güncel olduğunu; işbu bilgilerde değişiklik olması halinde değişiklikleri Şirkete bildireceğimi kabul ve beyan ederim.

KVK Kanunu’nda tanımlanan özel nitelikli kişisel verilerim de dahil olmak üzere ilgili kişisel verilerimin işlenmesine, ilgili süreç kapsamında işlenme amacı ile sınırlı olmak üzere kullanılmasına ve paylaşılmasına, gereken süre zarfında saklanmasına açık rızam olduğunu ve bu hususta tarafıma gerekli aydınlatmanın yapıldığını; işbu metni, Şirket Kişisel Verilerin Korunması ve İşlenmesi Yönetmeliğini ve Aydınlatma Metnini okuduğumu ve anladığımı;

;`;

interface Props {
  showDialog: () => void;
  hideDialog: () => void;
  onConfirm: () => void;
  visible: boolean;
}

const KVKKDialog = ({hideDialog, visible, onConfirm}: Props) => {
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>KVKK KAPSAMINDA AÇIK RIZA BEYANI</Dialog.Title>
          <Dialog.Content>
            <ScrollView style={{maxHeight: 400}}>
              <Text variant="bodyMedium">{KVKKMetni}</Text>
            </ScrollView>
          </Dialog.Content>

          <View style={{flexDirection: 'row', alignContent: 'space-between'}}>
            <Dialog.Actions>
              <Button onPress={onConfirm}>Evet</Button>
            </Dialog.Actions>

            <Dialog.Actions>
              <Button onPress={hideDialog}>Hayır</Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};

export default KVKKDialog;
